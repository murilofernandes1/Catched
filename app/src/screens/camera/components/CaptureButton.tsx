import React from "react";
import { View, TouchableOpacity } from "react-native";
import { styles } from "../styles";

type CaptureButtonProps = {
  onPress: () => void;
};

export const CaptureButton = ({ onPress }: CaptureButtonProps) => {
  return (
    <View style={styles.captureContainer}>
      <TouchableOpacity style={styles.captureButton} onPress={onPress}>
        <View style={styles.innerCircle} />
      </TouchableOpacity>
    </View>
  );
};
