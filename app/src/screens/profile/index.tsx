import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";
import { BackButton } from "../../components/BackButton";
import { useCollection } from "../../hooks/useCollection";
import Loading from "../../components/Loading";
import { useLogout } from "../../hooks/useLogout";

export default function Profile() {
  const { collectionData, loading, user } = useCollection();
  const logout = useLogout();

  const initials = user?.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (loading) return <Loading />;
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      bounces
    >
      <View style={styles.hero}>
        <View style={styles.heroTopBar}>
          <BackButton />
          <TouchableOpacity style={styles.heroAction} onPress={() => logout()}>
            <Feather name="log-out" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.avatarWrapper}>
          {/* {user.avatar ? (
            <Image
              source={{ uri: user.avatar }}
              style={styles.avatar}
              contentFit="cover"
            />
          ) : ( */}
          <View style={styles.avatarFallback}>
            <Text style={styles.avatarFallbackText}>{initials}</Text>
          </View>
          {/* )} */}
        </View>
        <Text style={styles.userName}>{user?.name}</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{collectionData.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      {/* <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Minha Coleção</Text>
        <TouchableOpacity>
          <Text style={styles.sectionLink}>Ver tudo</Text>
        </TouchableOpacity>
      </View> */}
    </ScrollView>
  );
}
