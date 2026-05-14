import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation-types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function Home() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.avatarButton}
        onPress={() => navigation.navigate("Profile")}
        activeOpacity={0.8}
      >
        <Feather name="user" size={18} color="#023e8a" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.logo}></Text>
        <Text style={styles.title}>Catched</Text>
        <Text style={styles.subtitle}>Encontre gatos perto de você</Text>
      </View>

      <View style={styles.cards}>
        <TouchableOpacity
          style={[styles.card, styles.cardMap]}
          onPress={() => navigation.navigate("Collection")}
          activeOpacity={0.85}
        >
          <Feather
            name="book"
            color="white"
            size={32}
            style={styles.cardIcon}
          />
          <Text style={styles.cardTitle}>Minha coleção</Text>
          <Text style={styles.cardDescription}>
            Vizualize os gatos que você já encontrou e identificou
          </Text>
          <View style={styles.cardArrow}>
            <Text style={styles.cardArrowText}>→</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardCamera]}
          onPress={() => navigation.navigate("Map")}
          activeOpacity={0.85}
        >
          <Feather
            name="map"
            color="#013a63"
            size={32}
            style={styles.cardIconCamera}
          />
          <Text style={styles.cardTitleCamera}>Ver Mapa</Text>
          <Text style={styles.cardDescriptionCamera}>
            Encontre gatos próximos à sua localização
          </Text>
          <View style={styles.cardArrowCamera}>
            <Text style={styles.cardArrowTextCamera}>→</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardMap]}
          onPress={() => navigation.navigate("Camera")}
          activeOpacity={0.85}
        >
          <Feather
            name="camera"
            color="white"
            size={32}
            style={styles.cardIcon}
          />
          <Text style={styles.cardTitle}>Identificar Gato</Text>
          <Text style={styles.cardDescription}>
            Tire uma foto e descubra quem é o Gato
          </Text>
          <View style={styles.cardArrow}>
            <Text style={styles.cardArrowText}>→</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.version}>v2.0</Text>
    </View>
  );
}
