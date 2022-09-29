import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 214,
    height: 120,
    marginTop: 74,
    marginBottom: 48,
  },
  contentList: {
    paddingLeft: 32,
    paddingRight: 64,
  },
  avatar: {
    flex: 1,
  },
  avatarButton: {
    height: 60,
    width: 60,
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 5,
  },
  profileContainer: {
    top: 50,
    right: 10,
    alignItems: "flex-end",
    position: "absolute",
    width: "100%",
    flexDirection: "column",
    zIndex: 9999,
  },
});
