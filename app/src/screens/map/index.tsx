import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { styles } from "./styles";
import MapView, { Marker, Circle } from "react-native-maps";
import { useUserLocation } from "../../hooks/useUserLocation";
import { useNearbyCats } from "../../hooks/useNearbyCats";
import Loading from "../../components/Loading";
import { BackButton } from "../../components/BackButton";
import { CatBottomSheet } from "../../components/CatBottomSheet";

export default function Map() {
  const { cats, selectedCat, setSelectedCat, loading } = useNearbyCats();
  const { mapRef, location } = useUserLocation();

  if (loading || !location) return <Loading />;

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={styles.map}
        onPress={() => setSelectedCat(null)}
      >
        <Circle
          center={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          radius={150}
          fillColor="rgba(0,119,182,0.08)"
          strokeColor="rgba(0,119,182,0.35)"
          strokeWidth={1}
        />

        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
        >
          <View style={styles.userMarker}>
            <View style={styles.userMarkerInner} />
          </View>
        </Marker>

        {cats?.map((cat: any) => (
          <Marker
            key={cat.id}
            coordinate={{ latitude: cat.latitude, longitude: cat.longitude }}
            onPress={() => setSelectedCat(cat)}
          >
            <View
              style={[
                styles.catMarker,
                selectedCat?.id === cat.id && styles.catMarkerSelected,
              ]}
            >
              <Image
                source={{ uri: cat.image }}
                style={styles.catImage}
                contentFit="cover"
              />
            </View>
          </Marker>
        ))}
      </MapView>

      {selectedCat && (
        <CatBottomSheet
          cat={selectedCat}
          onClose={() => setSelectedCat(null)}
        />
      )}

      <View style={styles.header}>
        <BackButton />
        <View>
          <Text style={styles.title}>Gatos na região</Text>
        </View>
      </View>

      <StatusBar style="light" />
    </View>
  );
}
