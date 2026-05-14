import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles";

export const FrameGuide = () => {
  return (
    <>
      <View style={styles.frameGuide}>
        <View style={[styles.corner, styles.cornerTL]} />
        <View style={[styles.corner, styles.cornerTR]} />
        <View style={[styles.corner, styles.cornerBL]} />
        <View style={[styles.corner, styles.cornerBR]} />
      </View>
    </>
  );
};
