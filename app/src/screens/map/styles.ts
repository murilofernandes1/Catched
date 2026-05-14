import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const palette = {
  deep: "#03045e",
  mid: "#023e8a",
  bright: "#0077b6",
  brightAlpha: "rgba(0,119,182,0.15)",
  deepAlpha: "rgba(3,4,94,0.95)",
  white: "#ffffff",
  cardBg: "#f8faff",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: palette.white,
  },

  userMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: palette.brightAlpha,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: palette.bright,
  },
  userMarkerInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: palette.bright,
  },

  catMarker: {
    width: 42,
    height: 42,
    borderRadius: 21,
    overflow: "hidden",
    borderWidth: 2.5,
    borderColor: palette.white,
    shadowColor: palette.deep,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  catMarkerSelected: {
    borderColor: palette.bright,
    borderWidth: 3,
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
  },
  catImage: {
    width: 42,
    height: 42,
  },

  catCard: {
    position: "absolute",
    bottom: 36,
    left: 16,
    right: 16,
    backgroundColor: palette.white,
    borderRadius: 24,
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: palette.deep,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 1,
    borderColor: "rgba(0,119,182,0.08)",
  },
  catCardImage: {
    width: 110,
    height: "100%",
  },
  catCardInfo: {
    flex: 1,
    padding: 16,
    gap: 3,
    justifyContent: "center",
    backgroundColor: palette.cardBg,
  },
  catCardName: {
    fontSize: 17,
    fontWeight: "800",
    color: palette.deep,
    letterSpacing: 0.1,
  },
  catCardBreed: {
    fontSize: 13,
    color: palette.mid,
    fontWeight: "600",
  },
  catCardDetail: {
    fontSize: 12,
    color: "#7b8fa6",
    marginTop: 5,
  },
  catCardReview: {
    fontSize: 11.5,
    color: "#8fa3b8",
    fontStyle: "italic",
    marginTop: 6,
    lineHeight: 17,
  },
});
