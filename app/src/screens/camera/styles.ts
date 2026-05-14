import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

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
  },

  // Permissão
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.bg,
    padding: 32,
    gap: 16,
  },
  permissionIcon: { fontSize: 56, marginBottom: 8 },
  permissionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: palette.deep,
    textAlign: "center",
  },
  permissionMessage: {
    fontSize: 15,
    color: "#7b8fa6",
    textAlign: "center",
    lineHeight: 22,
  },
  permissionButton: {
    backgroundColor: palette.bright,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 50,
    marginTop: 8,
  },
  permissionButtonText: {
    color: palette.white,
    fontWeight: "700",
    fontSize: 16,
  },

  // Câmera
  camera: { flex: 1 },
  frameGuide: {
    position: "absolute",
    top: "25%",
    left: "15%",
    width: "70%",
    height: "40%",
  },
  corner: {
    position: "absolute",
    width: 24,
    height: 24,
    borderColor: palette.white,
    borderWidth: 3,
  },
  cornerTL: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  cornerTR: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  cornerBL: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  cornerBR: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  cameraHint: {
    position: "absolute",
    top: "20%",
    alignSelf: "center",
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    fontWeight: "600",
    backgroundColor: palette.deepAlpha,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  captureContainer: {
    position: "absolute",
    bottom: 48,
    width: "100%",
    alignItems: "center",
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: palette.brightAlpha,
    borderWidth: 4,
    borderColor: palette.white,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: palette.white,
  },

  // Preview
  preview: {
    width: "100%",
    height: "50%",
  },
  previewSmall: {
    width: "100%",
    height: "30%",
  },

  // Card compartilhado
  card: {
    flex: 1,
    backgroundColor: palette.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    padding: 24,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  catName: { fontSize: 22, fontWeight: "900", color: palette.deep },
  catBreed: {
    fontSize: 13,
    color: palette.bright,
    fontWeight: "600",
    marginTop: 2,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: palette.bright,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 50,
  },
  badgeText: { color: palette.white, fontSize: 12, fontWeight: "700" },

  // Info grid
  infoGrid: { flexDirection: "row", gap: 10, marginBottom: 16 },
  infoItem: {
    flex: 1,
    backgroundColor: palette.bg,
    borderRadius: 12,
    padding: 12,
    gap: 4,
  },
  infoLabel: {
    fontSize: 10,
    color: "#7b8fa6",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoValue: { fontSize: 13, color: palette.deep, fontWeight: "700" },
  review: {
    fontSize: 13,
    color: "#8fa3b8",
    fontStyle: "italic",
    lineHeight: 18,
    marginBottom: 20,
  },

  // Registro
  registerContent: { gap: 16, paddingBottom: 32 },
  registerTitle: { fontSize: 22, fontWeight: "900", color: palette.deep },
  registerSubtitle: {
    fontSize: 13,
    color: "#7b8fa6",
    lineHeight: 18,
    marginTop: -8,
  },
  inputGroup: { gap: 6 },
  inputLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#7b8fa6",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  input: {
    backgroundColor: palette.bg,
    borderWidth: 1,
    borderColor: "rgba(0,119,182,0.15)",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: palette.deep,
  },
  inputMultiline: {
    height: 100,
    paddingTop: 14,
  },

  // Ações
  actions: { flexDirection: "row", gap: 10, marginTop: 8 },
  primaryButton: {
    flex: 1,
    backgroundColor: palette.mid,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  primaryButtonText: { color: palette.white, fontWeight: "800", fontSize: 15 },
  secondaryButton: {
    flex: 1,
    backgroundColor: palette.brightAlpha,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  secondaryButtonText: { color: palette.mid, fontWeight: "700", fontSize: 15 },

  // Botão fechar
  closeButton: {
    position: "absolute",
    top: 48,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: palette.brightAlpha,
    borderWidth: 1,
    borderColor: "rgba(0,119,182,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: { color: palette.mid, fontSize: 16, fontWeight: "700" },

  // Loading
  loadingContainer: {
    flex: 1,
    backgroundColor: palette.bg,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(248,250,255,0.88)",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    fontSize: 15,
    fontWeight: "600",
    color: palette.deep,
    letterSpacing: 0.3,
  },

  // Badge não encontrado
  notFoundBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: palette.brightAlpha,
    borderWidth: 1,
    borderColor: "rgba(0,119,182,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
    alignSelf: "flex-start",
  },
  notFoundText: {
    fontSize: 12,
    fontWeight: "700",
    color: palette.mid,
  },
  // Adicione esses estilos dentro do StyleSheet.create() do camera/styles.ts

  foundContent: { gap: 14, paddingBottom: 32 },

  foundBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  foundBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(0,119,182,0.12)",
    borderWidth: 1,
    borderColor: "rgba(0,119,182,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
  },
  foundBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#023e8a",
  },
  confidenceBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 50,
  },
  confidenceText: {
    fontSize: 11,
    fontWeight: "700",
  },
  foundName: {
    fontSize: 26,
    fontWeight: "900",
    color: "#03045e",
    letterSpacing: -0.5,
  },
  foundBreed: {
    fontSize: 14,
    color: "#0077b6",
    fontWeight: "600",
    marginTop: -6,
  },
  descriptionBox: { gap: 6 },
  foundDescription: {
    fontSize: 14,
    color: "#4a5568",
    lineHeight: 22,
  },
});
