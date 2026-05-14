import { Text, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { styles } from "../styles";
import { Cat } from "../../../types/cat-types";

export const CatCard = ({ cat }: { cat: Cat }) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
      <Image
        source={{ uri: cat.image }}
        style={styles.cardImage}
        contentFit="cover"
      />
      <View style={styles.cardBody}>
        <Text style={styles.cardName} numberOfLines={1}>
          {cat.name}
        </Text>
        <Text style={styles.cardBreed} numberOfLines={1}>
          {cat.breed}
        </Text>
        <Text style={styles.cardBreed} numberOfLines={1}>
          {cat.created_at
            ? `${new Date(cat.created_at).toLocaleDateString("pt-BR")} às ${new Date(
                cat.created_at,
              ).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}`
            : "Data Desconhecida"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
