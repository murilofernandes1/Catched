import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "../styles";

type LoadingScreenProps = {
  photo: string | null;
  onClose: () => void;
};

export const LoadingScreen = ({ photo, onClose }: LoadingScreenProps) => {
  return (
    <View style={styles.loadingContainer}>
      {photo && (
        <Image source={{ uri: photo }} style={styles.preview} blurRadius={4} />
      )}
      <View style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color="#" />
        <Text style={styles.loadingText}>Identificando Gato...</Text>
      </View>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Feather name="x" size={18} color="#1a1a1a" />
      </TouchableOpacity>
    </View>
  );
};
