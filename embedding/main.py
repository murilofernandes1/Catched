from dotenv import load_dotenv
load_dotenv()

"""
Embedding Microservice — MegaDescriptor-T-224
=============================================
Microserviço FastAPI responsável por gerar e comparar embeddings de imagens
de gatos usando o MegaDescriptor-T-224, um modelo treinado especificamente
para re-identificação individual de animais.

Endpoints:
  POST /embed          → gera embedding de uma imagem
  POST /identify       → compara imagem contra lista de embeddings salvos
  GET  /health         → healthcheck

Uso no docker-compose: chamado pelo backend Node.js via HTTP interno.
"""

import asyncio
import json
import logging
import os
import shutil
import uuid
from contextlib import asynccontextmanager
from math import atan2, cos, radians, sin, sqrt
from pathlib import Path
from typing import Optional

import httpx
import numpy as np
import timm
import torch
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from pydantic import BaseModel
from torchvision import transforms

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Config (via env vars)
# ---------------------------------------------------------------------------

SIMILARITY_THRESHOLD = float(os.getenv("SIMILARITY_THRESHOLD", "0.72"))
SIMILARITY_UNCERTAIN = float(os.getenv("SIMILARITY_UNCERTAIN", "0.62"))
LOCATION_WEIGHT = float(os.getenv("LOCATION_WEIGHT", "0.15"))
UPLOAD_DIR = os.getenv("UPLOAD_DIR", "uploads")
CLOUDINARY_URL = os.getenv("CLOUDINARY_URL", "")
CLOUDINARY_UPLOAD_PRESET = os.getenv("CLOUDINARY_UPLOAD_PRESET", "mobile")

os.makedirs(UPLOAD_DIR, exist_ok=True)

# ---------------------------------------------------------------------------
# Model (singleton)
# ---------------------------------------------------------------------------

_model = None
_transform = None


def load_model():
    global _model, _transform
    if _model is not None:
        return

    logger.info("Carregando MegaDescriptor-T-224...")
    _model = timm.create_model("hf-hub:BVRA/MegaDescriptor-T-224", num_classes=0, pretrained=True)
    _model.eval()

    device = "cuda" if torch.cuda.is_available() else "cpu"
    _model = _model.to(device)

    _transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])

    logger.info(f"Modelo carregado em {device}")


# ---------------------------------------------------------------------------
# Core functions
# ---------------------------------------------------------------------------

def get_embedding(image_path: str | Path) -> list[float]:
    """Extrai embedding 768d normalizado de uma imagem."""
    load_model()
    device = next(_model.parameters()).device
    image = Image.open(image_path).convert("RGB")
    tensor = _transform(image).unsqueeze(0).to(device)
    with torch.no_grad():
        emb = _model(tensor)
    emb = emb / emb.norm(dim=-1, keepdim=True)
    return emb.squeeze().cpu().tolist()


def cosine_similarity(a: list[float], b: list[float]) -> float:
    return float(np.dot(a, b))


def haversine_meters(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 6_371_000
    f1, f2 = radians(lat1), radians(lat2)
    df = radians(lat2 - lat1)
    dl = radians(lon2 - lon1)
    a = sin(df / 2) ** 2 + cos(f1) * cos(f2) * sin(dl / 2) ** 2
    return R * 2 * atan2(sqrt(a), sqrt(1 - a))


def calc_location_score(locations: list[dict], lat: float | None, lon: float | None) -> float:
    """Score de localização em [0,1]. Neutro (0.5) se não houver dados."""
    if lat is None or lon is None:
        return 0.5
    valid = [l for l in locations if l.get("lat") and l.get("lon")]
    if not valid:
        return 0.5
    scores = [max(0.0, 1.0 - haversine_meters(l["lat"], l["lon"], lat, lon) / 1000.0) for l in valid]
    return float(np.mean(scores))


def confidence_label(score: float) -> str:
    if score >= 0.90:
        return "high"
    if score >= SIMILARITY_THRESHOLD:
        return "medium"
    return "low"


def save_upload(file: UploadFile) -> str:
    ext = Path(file.filename or "photo.jpg").suffix or ".jpg"
    path = os.path.join(UPLOAD_DIR, f"{uuid.uuid4().hex}{ext}")
    with open(path, "wb") as buf:
        shutil.copyfileobj(file.file, buf)
    return path


def delete_file(path: str):
    try:
        os.remove(path)
    except FileNotFoundError:
        pass


async def upload_to_cloudinary(image_path: str) -> str:
    """Faz upload de uma imagem pro Cloudinary e retorna a URL."""
    if not CLOUDINARY_URL:
        raise HTTPException(status_code=500, detail="CLOUDINARY_URL não configurada.")
    with open(image_path, "rb") as f:
        files = {"file": ("cat.jpg", f, "image/jpeg")}
        data = {"upload_preset": CLOUDINARY_UPLOAD_PRESET}
        async with httpx.AsyncClient() as client:
            response = await client.post(CLOUDINARY_URL, files=files, data=data)
            response.raise_for_status()
    return response.json()["secure_url"]


# ---------------------------------------------------------------------------
# Schemas
# ---------------------------------------------------------------------------

class EmbeddingResponse(BaseModel):
    embedding: list[float]
    image_url: str  # URL do Cloudinary após upload


class CatEmbedding(BaseModel):
    """Embedding de um gato já cadastrado, enviado pelo backend Node."""
    cat_id: str
    name: str
    embeddings: list[list[float]]       # todos os embeddings das fotos cadastradas
    locations: list[dict] = []           # [{"lat": float, "lon": float}, ...]


class IdentifyRequest(BaseModel):
    cats: list[CatEmbedding]
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class IdentifyResponse(BaseModel):
    found: bool
    cat_id: Optional[str] = None
    name: Optional[str] = None
    similarity: Optional[float] = None
    confidence: Optional[str] = None
    uncertain: bool = False


# ---------------------------------------------------------------------------
# App
# ---------------------------------------------------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):
    load_model()
    yield


app = FastAPI(
    title="Cat Embedding Microservice",
    description="Geração e comparação de embeddings via MegaDescriptor-T-224",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": _model is not None}


@app.post("/embed", response_model=EmbeddingResponse)
async def embed(file: UploadFile = File(...)):
    print(f">>> CLOUDINARY_URL: '{CLOUDINARY_URL}'")
    content = await file.read()
    print(f">>> file size: {len(content)} bytes")
    await file.seek(0)

    path = save_upload(file)
    try:
        embedding = get_embedding(path)
        print(f">>> embedding gerado OK")
        image_url = await upload_to_cloudinary(path)
        print(f">>> upload OK: {image_url}")
    except Exception as e:
        print(f">>> ERRO: {type(e).__name__}: {e}")
        raise
    finally:
        delete_file(path)

    return EmbeddingResponse(embedding=embedding, image_url=image_url)


@app.post("/identify", response_model=IdentifyResponse)
async def identify(
    file: UploadFile = File(...),
    payload: str = Form(...),
):
    try:
        print(f">>> content_type: {file.content_type}")
        request_data = IdentifyRequest(**json.loads(payload))
        print(f">>> parsed OK, cats: {len(request_data.cats)}")
    except Exception as e:
        print(f">>> ERRO parse: {type(e).__name__}: {e}")
        raise

    path = save_upload(file)
    try:
        new_embedding = get_embedding(path)
        print(f">>> embedding OK")
    except Exception as e:
        print(f">>> ERRO embedding: {type(e).__name__}: {e}")
        raise HTTPException(status_code=422, detail=str(e))
    finally:
        delete_file(path)


    # Filtra gatos por localização se disponível
    cats = request_data.cats
    if request_data.latitude and request_data.longitude:
        SENSIVITY = 0.01  # ~1km
        cats = [
            c for c in cats
            if any(
                abs(l.get("lat", 0) - request_data.latitude) <= SENSIVITY and
                abs(l.get("lon", 0) - request_data.longitude) <= SENSIVITY
                for l in (c.locations or [{"lat": request_data.latitude, "lon": request_data.longitude}])
            )
        ] or cats  # fallback pra todos se filtro zerar a lista

    vis_weight = 1.0 - LOCATION_WEIGHT
    best_cat = None
    best_score = 0.0

    for cat in cats:
        if not cat.embeddings:
            continue

        visual_scores = [cosine_similarity(new_embedding, emb) for emb in cat.embeddings]
        visual = (max(visual_scores) * 0.7) + (float(np.mean(visual_scores)) * 0.3)

        loc = calc_location_score(cat.locations, request_data.latitude, request_data.longitude)
        final = vis_weight * visual + LOCATION_WEIGHT * loc

        logger.info(f"[MATCH] {cat.name}: visual={visual:.4f} loc={loc:.4f} final={final:.4f}")

        if final > best_score:
            best_score = final
            best_cat = cat

    if best_cat and best_score >= SIMILARITY_THRESHOLD:
        return IdentifyResponse(
            found=True,
            cat_id=best_cat.cat_id,
            name=best_cat.name,
            similarity=round(best_score, 4),
            confidence=confidence_label(best_score),
            uncertain=False,
        )

    if best_cat and best_score >= SIMILARITY_UNCERTAIN:
        return IdentifyResponse(
            found=False,
            cat_id=best_cat.cat_id,
            name=best_cat.name,
            similarity=round(best_score, 4),
            confidence="low",
            uncertain=True,  # frontend pode perguntar "É o Mimi?"
        )

    return IdentifyResponse(found=False)