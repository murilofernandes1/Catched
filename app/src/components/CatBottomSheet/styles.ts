import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

const palette = {
  deep: "#03045e",
  mid: "#023e8a",
  bright: "#0077b6",
  brightAlpha: "rgba(0,119,182,0.12)",
  white: "#ffffff",
  bg: "#f8faff",
};

export const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(3,4,94,0.35)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: palette.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: "hidden",
    maxHeight: height * 0.82,
  },
  image: {
    width: "100%",
    height: 220,
  },
  handle: {
    position: "absolute",
    top: 12,
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.6)",
  },
  content: {
    padding: 24,
    gap: 16,
  },

  // Topo: nome + badge data
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  name: {
    fontSize: 26,
    fontWeight: "900",
    color: palette.deep,
    letterSpacing: -0.5,
    flex: 1,
  },
  dateBadge: {
    backgroundColor: palette.brightAlpha,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    marginLeft: 12,
  },
  dateText: {
    fontSize: 11,
    fontWeight: "700",
    color: palette.mid,
  },
  timeText: {
    fontSize: 10,
    color: "#7b8fa6",
    marginTop: 1,
  },

  // Tags raça e cor
  tagsRow: {
    flexDirection: "row",
    gap: 8,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: palette.bg,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(0,119,182,0.15)",
  },
  tagText: {
    fontSize: 13,
    fontWeight: "600",
    color: palette.mid,
  },

  // Descrição
  descriptionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#7b8fa6",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: -8,
  },
  description: {
    fontSize: 14,
    color: "#4a5568",
    lineHeight: 22,
  },

  // Botão fechar
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});
