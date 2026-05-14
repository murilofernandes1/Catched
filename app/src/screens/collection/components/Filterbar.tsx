import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles";

type FilterType = "todos" | "fotografado" | "favoritado";

type FilterBarProps = {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
};

const FILTERS: { label: string; value: FilterType }[] = [
  { label: "Todos", value: "todos" },
  { label: "Fotografado", value: "fotografado" },
  { label: "Favoritado", value: "favoritado" },
];

export const FilterBar = ({ filter, onFilterChange }: FilterBarProps) => {
  return (
    <View style={styles.filterBar}>
      {FILTERS.map((f) => (
        <TouchableOpacity
          key={f.value}
          style={[
            styles.filterButton,
            filter === f.value && styles.filterButtonActive,
          ]}
          onPress={() => onFilterChange(f.value)}
        >
          <Text
            style={[
              styles.filterText,
              filter === f.value && styles.filterTextActive,
            ]}
          >
            {f.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
