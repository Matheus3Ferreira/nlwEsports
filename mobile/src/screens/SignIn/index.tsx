import { Image, TouchableOpacity, Text } from "react-native";
import logoImg from "../../assets/logo-nlw-esports.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { DiscordLogo } from "phosphor-react-native";
import * as AuthSession from "expo-auth-session";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";
import { Background } from "../../components/Background";
import { THEME } from "../../theme";
import { IUserParams } from "../../@types/@navigation";

export function SignIn() {
  const navigation = useNavigation();

  async function handleLogin(): Promise<void> {
    const response = await AuthSession.startAsync({
      authUrl:
        "https://discord.com/api/oauth2/authorize?client_id=1022230102114840706&redirect_uri=https%3A%2F%2Fauth.expo.io%2F%40rinkakyo%2Fmobile&response_type=token&scope=identify%20email",
    });

    const hasResponseAndIsSuccessfully =
      response && response.type === "success";

    if (hasResponseAndIsSuccessfully) {
      const data = await fetch("https://discord.com/api/users/@me", {
        headers: {
          authorization: `Bearer ${response.params.access_token}`,
        },
      }).then((response) => response.json());
      const { avatar, email, id, username, discriminator }: IUserParams = data; // get data from user

      return navigation.navigate("home", {
        avatar,
        email,
        id,
        username,
        discriminator,
      });
    }
    alert("Algo de errado aconteceu. Tente novamente. :c");
  }
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.discordLoginButton}
        >
          <DiscordLogo size={40} color={THEME.COLORS.TEXT} />
          <Text style={styles.buttonTitle}>Entre com Discord</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Background>
  );
}
