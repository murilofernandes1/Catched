import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#fafafa",
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#023e8a",
    letterSpacing: -0.5,
    marginLeft: "25%",
  },

  list: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  row: {
    gap: 16,
    marginBottom: 16,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardImage: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
  },

  cardBody: {
    padding: 12,
    gap: 2,
  },
  cardName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#023e8a",
  },
  cardBreed: {
    fontSize: 12,
    color: "#0077b6",
    fontWeight: "600",
  },
  cardAge: {
    fontSize: 11,
    color: "#bbb",
    marginTop: 2,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#555",
  },
});
