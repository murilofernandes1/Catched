import { StyleSheet } from "react-native";

const palette = {
  deep: "#03045e",
  mid: "#023e8a",
  bright: "#0077b6",
  brightAlpha: "rgba(0,119,182,0.12)",
  white: "#ffffff",
  bg: "#f8faff",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
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
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#7b8fa6",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: "rgba(0,119,182,0.15)",
    borderRadius: 14,
    paddingHorizontal: 16,
    gap: 10,
    shadowColor: palette.deep,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 15,
    color: palette.deep,
  },
  forgotButton: {
    alignSelf: "flex-end",
  },
  forgotText: {
    fontSize: 13,
    color: palette.bright,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: palette.mid,
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8,
    shadowColor: palette.deep,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    color: palette.white,
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 0.3,
  },
  version: {
    textAlign: "center",
    color: "#7b8fa6",
    fontSize: 12,
    marginTop: 48,
  },
});
