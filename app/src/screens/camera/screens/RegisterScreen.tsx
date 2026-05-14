import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "../styles";
import { RegisterProps } from "../../../types/auth-types";

export const RegisterScreen = ({
  photo,
  form,
  setForm,
  onRegister,
  onCancel,
  onClose,
}: RegisterProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.previewSmall} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.card}
          contentContainerStyle={styles.registerContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.registerTitle}>Registrar Gato</Text>
          <Text style={styles.registerSubtitle}>
            Não encontramos esse Gato na nossa base de dados, então vamos
            precisar de algumas informações para registrá-lo. Quanto mais
            detalhes, melhor!
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Sr. Bigodes"
              placeholderTextColor="#ccc"
              value={form.name}
              onChangeText={(v) => setForm({ ...form, name: v })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Cor</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Cinza"
              placeholderTextColor="#ccc"
              value={form.color}
              onChangeText={(v) => setForm({ ...form, color: v })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Raça</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Vira-lata"
              placeholderTextColor="#ccc"
              value={form.breed}
              onChangeText={(v) => setForm({ ...form, breed: v })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.inputMultiline]}
              placeholder="Conte um pouco sobre esse Gato..."
              placeholderTextColor="#ccc"
              value={form.description}
              onChangeText={(v) => setForm({ ...form, description: v })}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.secondaryButton} onPress={onCancel}>
              <Text style={styles.secondaryButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryButton} onPress={onRegister}>
              <Text style={styles.primaryButtonText}>Registrar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Feather name="x" size={18} color="#1a1a1a" />
      </TouchableOpacity>
    </View>
  );
};
