import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import { styles } from "../styles";
import { Cat } from "../../../types/cat-types";

type FoundScreenProps = {
  cat: Cat;
  similarity?: number;
  confidence?: "high" | "medium" | "low";
  photo: string;
  onRetake: () => void;
  onClose: () => void;
};

const CONFIDENCE_LABEL = {
  high: "Alta confiança",
  medium: "Média confiança",
  low: "Baixa confiança",
};

const CONFIDENCE_COLOR = {
  high: "#0077b6",
  medium: "#f59e0b",
  low: "#94a3b8",
};

export const FoundScreen = ({
  cat,
  similarity,
  confidence,
  photo,
  onRetake,
  onClose,
}: FoundScreenProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: cat.image }}
        style={styles.preview}
        contentFit="cover"
      />

      <ScrollView
        style={styles.card}
        contentContainerStyle={styles.foundContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Badge identificado */}
        <View style={styles.foundBadgeRow}>
          <View style={styles.foundBadge}>
            <Feather name="check-circle" size={13} color="#0077b6" />
            <Text style={styles.foundBadgeText}>Gato identificado!</Text>
          </View>
          {confidence && (
            <View
              style={[
                styles.confidenceBadge,
                { backgroundColor: `${CONFIDENCE_COLOR[confidence]}18` },
              ]}
            >
              <Text
                style={[
                  styles.confidenceText,
                  { color: CONFIDENCE_COLOR[confidence] },
                ]}
              >
                {CONFIDENCE_LABEL[confidence]}
              </Text>
            </View>
          )}
        </View>

        {/* Nome e raça */}
        <Text style={styles.foundName}>{cat.name}</Text>
        <Text style={styles.foundBreed}>{cat.breed}</Text>

        {/* Info grid */}
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Cor</Text>
            <Text style={styles.infoValue}>{cat.color}</Text>
          </View>
          {similarity !== undefined && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Similaridade</Text>
              <Text style={styles.infoValue}>
                {Math.round(similarity * 100)}%
              </Text>
            </View>
          )}
        </View>

        {/* Descrição */}
        {cat.description ? (
          <View style={styles.descriptionBox}>
            <Text style={styles.infoLabel}>Sobre</Text>
            <Text style={styles.foundDescription}>{cat.description}</Text>
          </View>
        ) : null}

        {/* Ações */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.secondaryButton} onPress={onRetake}>
            <Text style={styles.secondaryButtonText}>Tirar outra</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={onClose}>
            <Text style={styles.primaryButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Feather name="x" size={18} color="#023e8a" />
      </TouchableOpacity>
    </View>
  );
};
