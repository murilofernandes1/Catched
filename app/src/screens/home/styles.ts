import { StyleSheet } from "react-native";

const palette = {
  deep: "#03045e",
  mid: "#023e8a",
  bright: "#0077b6",
  brightAlpha: "rgba(0,119,182,0.15)",
  deepAlpha: "rgba(3,4,94,0.95)",
  white: "#ffffff",
  bg: "#f8faff",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
    paddingHorizontal: 20,
    justifyContent: "center",
  },

  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    fontSize: 56,
    marginBottom: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
    color: palette.deep,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 14,
    color: "#7b8fa6",
    marginTop: 6,
    letterSpacing: 0.3,
  },

  cards: {
    gap: 12,
  },
  card: {
    borderRadius: 20,
    padding: 24,
    position: "relative",
    overflow: "hidden",
  },

  cardMap: {
    backgroundColor: palette.mid,
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: palette.white,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: "rgba(255,255,255,0.65)",
    lineHeight: 18,
    maxWidth: "80%",
  },
  cardArrow: {
    position: "absolute",
    right: 24,
    bottom: 24,
    width: 38,
    height: 38,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  cardArrowText: {
    color: palette.white,
    fontSize: 15,
    fontWeight: "700",
    position: "relative",
    bottom: 3,
  },

  cardCamera: {
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: "rgba(0,119,182,0.2)",
  },
  cardIconCamera: {
    fontSize: 32,
    marginBottom: 12,
  },
  cardTitleCamera: {
    fontSize: 20,
    fontWeight: "800",
    color: palette.deep,
    marginBottom: 4,
  },
  cardDescriptionCamera: {
    fontSize: 13,
    color: "#7b8fa6",
    lineHeight: 18,
    maxWidth: "80%",
  },
  cardArrowCamera: {
    position: "absolute",
    right: 24,
    bottom: 24,
    width: 38,
    height: 38,
    borderRadius: 18,
    backgroundColor: palette.bright,
    justifyContent: "center",
    alignItems: "center",
  },
  cardArrowTextCamera: {
    color: palette.white,
    fontSize: 15,
    fontWeight: "700",
    position: "relative",
    bottom: 3,
  },

  cardSettings: {
    backgroundColor: palette.deep,
    borderWidth: 1,
    borderColor: palette.mid,
  },

  version: {
    textAlign: "center",
    color: "#7b8fa6",
    fontSize: 12,
    marginTop: 32,
  },
  avatarButton: {
    position: "absolute",
    top: 52,
    right: 20,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: palette.brightAlpha,
    borderWidth: 1,
    borderColor: "rgba(0,119,182,0.2)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});
