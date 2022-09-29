import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 35,
  },
  logo: {
    width: 214,
    height: 120,
    marginTop: 74,
    marginBottom: 48,
  },
  discordLoginButton: {
    width: "100%",
    height: 60,
    backgroundColor: THEME.COLORS.PRIMARY,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: THEME.COLORS.TEXT,
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.MD,
    marginLeft: 20,
  },
});
