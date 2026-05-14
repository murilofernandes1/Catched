import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { CameraView } from "expo-camera";
import { Feather } from "@expo/vector-icons";
import { styles } from "../styles";
import { FrameGuide } from "../components/FrameGuide";
import { CaptureButton } from "../components/CaptureButton";
import { CameraScreenProps } from "../../../types/camera-types";

export const CameraScreen = ({
  cameraRef,
  onTakePicture,
  onClose,
  photoCount,
  totalPhotos,
}: CameraScreenProps) => {
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef}>
        <FrameGuide />

        <Text style={styles.cameraHint}>
          Foto {photoCount + 1} de {totalPhotos}
        </Text>

        <CaptureButton onPress={onTakePicture} />
      </CameraView>

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Feather name="x" size={18} color="#1a1a1a" />
      </TouchableOpacity>
    </View>
  );
};
