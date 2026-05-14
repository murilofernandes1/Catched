import { Text, View, FlatList } from "react-native";
import { styles } from "./styles";
import { BackButton } from "../../components/BackButton";
import { useCollection } from "../../hooks/useCollection";
import { CatCard } from "./components/CatCard";
import { ActivityIndicator } from "react-native";
import Loading from "../../components/Loading";

export default function Collection() {
  const { collectionData, loading } = useCollection();
  if (loading) return <Loading />;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <View>
          <Text style={styles.title}>Minha Coleção</Text>
        </View>
      </View>
      {collectionData ? (
        <FlatList
          data={collectionData}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <CatCard cat={item} />}
        />
      ) : (
        <Text style={styles.emptyText}>Nenhum gato encontrado na coleção.</Text>
      )}
    </View>
  );
}
