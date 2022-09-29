import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    height: 60,
    position: "absolute",
    top: 50 + 60 + 5, // marginTop + height + avatar
    right: 5,
    backgroundColor: THEME.COLORS.BACKGROUND_800,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  text: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    color: THEME.COLORS.CAPTION_500,
    fontSize: THEME.FONT_SIZE.SM,
  },
  buttonLogOut: {
    color: THEME.COLORS.ALERT,
    fontSize: THEME.FONT_SIZE.MD,
  },
  username: {
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    color: THEME.COLORS.TEXT,
    paddingRight: 25,
    fontSize: THEME.FONT_SIZE.MD,
  },
  invisibleButtonClose: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
