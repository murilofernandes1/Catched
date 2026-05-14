import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles";

type PermissionScreenProps = {
  onRequestPermission: () => void;
};

export const PermissionScreen = ({
  onRequestPermission,
}: PermissionScreenProps) => {
  return (
    <View style={styles.permissionContainer}>
      <Text style={styles.permissionIcon}></Text>
      <Text style={styles.permissionTitle}>Permissão de Câmera</Text>
      <Text style={styles.permissionMessage}>
        Precisamos da câmera para identificar gatos
      </Text>
      <TouchableOpacity
        onPress={onRequestPermission}
        style={styles.permissionButton}
      >
        <Text style={styles.permissionButtonText}>Conceder Permissão</Text>
      </TouchableOpacity>
    </View>
  );
};
