import React, { useState, useRef, useEffect } from "react";
import { View, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import Loading from "../../components/Loading";
import { uploadToCloudinary } from "../../services/cloudinary";
import registerCat from "../../services/register-cats";
import { identifyCat } from "../../services/identify-cats";
import { useUserLocation } from "../../hooks/useUserLocation";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation-types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IdentifyResult } from "../../types/cat-types";
import api from "../../services/api";
import { PermissionScreen } from "./screens/PermissionScreen";
import { LoadingScreen } from "./screens/LoadingScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { CameraScreen } from "./screens/CameraScreen";
import { FoundScreen } from "../camera/screens/FoundScreen";

type Screen = "camera" | "loading" | "found" | "register";

type FormState = {
  name: string;
  color: string;
  breed: string;
  description: string;
  image: string | null;
};

const TOTAL_PHOTOS = 3;

export default function CameraComponent() {
  const [permission, requestPermission] = useCameraPermissions();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { location } = useUserLocation();
  const locationRef = useRef(location);
  useEffect(() => {
    locationRef.current = location;
  }, [location]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [screen, setScreen] = useState<Screen>("camera");
  const [loading, setLoading] = useState(false);
  const [identifyResult, setIdentifyResult] = useState<IdentifyResult | null>(
    null,
  );
  const [form, setForm] = useState<FormState>({
    name: "",
    color: "",
    breed: "",
    description: "",
    image: null,
  });
  const cameraRef = useRef<CameraView | null>(null);

  const handleClose = () => navigation.goBack();

  const reset = () => {
    setPhotos([]);
    setScreen("camera");
    setIdentifyResult(null);
    setForm({ name: "", color: "", breed: "", description: "", image: null });
  };

  const takePicture = async () => {
    if (!cameraRef.current) return;

    const data = await cameraRef.current.takePictureAsync({
      quality: 0.5,
      skipProcessing: true,
    });

    const newPhotos = [...photos, data.uri];
    setPhotos(newPhotos);

    // Ainda não tirou todas as fotos — continua na câmera
    if (newPhotos.length < TOTAL_PHOTOS) return;

    // Tirou as 3 — identifica com a primeira
    setScreen("loading");

    try {
      const result = await identifyCat(newPhotos[0], {
        latitude: locationRef.current?.coords.latitude ?? 0,
        longitude: locationRef.current?.coords.longitude ?? 0,
      });

      console.log(">>> result:", JSON.stringify(result));

      if (result.found && result.cat_id) {
        const catResponse = await api.get(`/cats/${result.cat_id}`);
        setIdentifyResult({ ...result, cat: catResponse.data });
      } else {
        setIdentifyResult(result);
      }

      setScreen(result.found ? "found" : "register");
    } catch (error) {
      console.error(">>> identify error:", error);
      setScreen("register");
    }
  };

  const handleRegister = async () => {
    if (!form.name.trim() || !form.breed.trim() || !form.color.trim()) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha nome, raça e cor antes de registrar.",
      );
      return;
    }

    try {
      setLoading(true);

      await registerCat(
        {
          name: form.name,
          breed: form.breed,
          color: form.color,
          description: form.description,
          longitude: location?.coords.longitude || 0,
          latitude: location?.coords.latitude || 0,
        },
        photos,
      );

      setLoading(false);
      navigation.navigate("Collection");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  if (!permission) return <View />;
  if (loading) return <Loading />;
  if (!permission.granted) {
    return <PermissionScreen onRequestPermission={requestPermission} />;
  }

  if (screen === "loading") {
    return <LoadingScreen photo={photos[0] ?? null} onClose={handleClose} />;
  }

  if (screen === "found" && identifyResult?.found && identifyResult?.cat) {
    return (
      <FoundScreen
        cat={identifyResult.cat!}
        similarity={identifyResult.similarity}
        confidence={identifyResult.confidence}
        photo={photos[0]!}
        onRetake={reset}
        onClose={handleClose}
      />
    );
  }

  if (screen === "register" && photos.length > 0) {
    return (
      <RegisterScreen
        photo={photos[0]}
        form={form}
        setForm={setForm}
        onRegister={handleRegister}
        onCancel={reset}
        onClose={handleClose}
      />
    );
  }

  return (
    <CameraScreen
      cameraRef={cameraRef}
      onTakePicture={takePicture}
      onClose={handleClose}
      photoCount={photos.length}
      totalPhotos={TOTAL_PHOTOS}
    />
  );
}
