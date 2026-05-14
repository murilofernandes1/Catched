import { StyleSheet } from "react-native";

const palette = {
  deep: "#03045e",
  mid: "#023e8a",
  bright: "#0077b6",
  brightAlpha: "rgba(0,119,182,0.12)",
  deepAlpha: "rgba(3,4,94,0.95)",
  white: "#ffffff",
  bg: "#f8faff",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
  },

  hero: {
    backgroundColor: palette.mid,
    paddingTop: 56,
    paddingBottom: 56,
    alignItems: "center",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  heroTopBar: {
    position: "absolute",
    top: 52,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heroAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: palette.white,
    overflow: "hidden",
    marginBottom: 14,
    shadowColor: palette.deep,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  avatarFallback: {
    width: "100%",
    height: "100%",
    backgroundColor: palette.bright,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarFallbackText: {
    fontSize: 36,
    fontWeight: "900",
    color: palette.white,
  },
  userName: {
    fontSize: 22,
    fontWeight: "900",
    color: palette.white,
    letterSpacing: 0.2,
  },

  statsRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: -28,
    backgroundColor: palette.white,
    borderRadius: 20,
    padding: 20,
    shadowColor: palette.deep,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(0,119,182,0.08)",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: "rgba(0,119,182,0.12)",
    marginVertical: 4,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "900",
    color: palette.deep,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#7b8fa6",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: palette.deep,
  },
  sectionLink: {
    fontSize: 13,
    fontWeight: "600",
    color: palette.bright,
  },

  grid: {
    paddingHorizontal: 20,
    gap: 10,
  },
  gridRow: {
    gap: 10,
  },
  catCard: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: palette.white,
    shadowColor: palette.deep,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  catImage: {
    width: "100%",
    height: 110,
  },
  catInfo: {
    padding: 10,
    gap: 2,
  },
  catName: {
    fontSize: 13,
    fontWeight: "800",
    color: palette.deep,
  },
  catBreed: {
    fontSize: 11,
    color: "#7b8fa6",
    fontWeight: "500",
  },
});
