import { CameraView } from "expo-camera";
export interface CameraScreenProps {
  cameraRef: React.RefObject<CameraView | null>;
  onTakePicture: () => void;
  onClose: () => void;
  photoCount: number;
  totalPhotos: number;
}
