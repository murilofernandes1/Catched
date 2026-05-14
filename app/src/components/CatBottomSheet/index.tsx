import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  ScrollView,
} from "react-native";
import { useEffect, useRef } from "react";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import { Cat } from "../../types/cat-types";
import { styles } from "./styles";

type CatBottomSheetProps = {
  cat: Cat | null;
  onClose: () => void;
};

export const CatBottomSheet = ({ cat, onClose }: CatBottomSheetProps) => {
  const translateY = useRef(new Animated.Value(600)).current;

  useEffect(() => {
    if (cat) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20,
        stiffness: 180,
      }).start();
    } else {
      translateY.setValue(600);
    }
  }, [cat]);

  const handleClose = () => {
    Animated.timing(translateY, {
      toValue: 600,
      duration: 250,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return {
      date: date.toLocaleDateString("pt-BR"),
      time: date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  if (!cat) return null;

  const formatted = formatDate(cat.created_at);

  return (
    <Modal
      transparent
      visible={!!cat}
      onRequestClose={handleClose}
      animationType="fade"
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={handleClose}
      >
        <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
          <TouchableOpacity activeOpacity={1}>
            <View>
              <Image
                source={{ uri: cat.image }}
                style={styles.image}
                contentFit="cover"
              />
              <View style={styles.handle} />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleClose}
              >
                <Feather name="x" size={16} color="#fff" />
              </TouchableOpacity>
            </View>

            <ScrollView
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.topRow}>
                <Text style={styles.name}>{cat.name}</Text>
                {formatted && (
                  <View style={styles.dateBadge}>
                    <Text style={styles.dateText}>{formatted.date}</Text>
                    <Text style={styles.timeText}>{formatted.time}</Text>
                  </View>
                )}
              </View>

              {/* Tags */}
              <View style={styles.tagsRow}>
                <View style={styles.tag}>
                  {/* <Feather name="tag" size={12} color="#023e8a" /> */}
                  <Text style={styles.tagText}>Raça {cat.breed}</Text>
                </View>
                <View style={styles.tag}>
                  {/* <Feather name="droplet" size={12} color="#023e8a" /> */}
                  <Text style={styles.tagText}>Cor {cat.color}</Text>
                </View>
              </View>

              {cat.description ? (
                <>
                  <Text style={styles.descriptionLabel}>Descrição</Text>
                  <Text style={styles.description}>{cat.description}</Text>
                </>
              ) : null}
            </ScrollView>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};
