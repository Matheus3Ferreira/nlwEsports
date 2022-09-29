import { useEffect, useState } from "react";
import {
  Image,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  View,
} from "react-native";
import logoImg from "../../assets/logo-nlw-esports.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { useNavigation, useRoute } from "@react-navigation/native";

import { styles } from "./styles";
import { Background } from "../../components/Background";
import { IUserParams } from "../../@types/@navigation";
import { ProfileMenu } from "../../components/ProfileMenu";

export function Home() {
  useEffect(() => {
    fetch("http://192.168.1.5:3333/api/games")
      .then((response) => response.json())
      .then((data) => setGame(data));
  }, []);

  const [game, setGame] = useState<GameCardProps[]>([]);
  const [isOpenedProfileMenu, setIsOpenedProfileMenu] =
    useState<boolean>(false);
  const navigation = useNavigation();

  function handleOpenGameScreen({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate("game", { id, title, bannerUrl });
  }

  const route = useRoute();
  const user = route.params as IUserParams;

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.profileContainer}>
          <TouchableOpacity
            style={styles.avatarButton}
            onPress={() => setIsOpenedProfileMenu(!isOpenedProfileMenu)}
          >
            <ImageBackground
              style={styles.avatar}
              source={{
                uri: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`,
              }}
            />
          </TouchableOpacity>
          {isOpenedProfileMenu && (
            <ProfileMenu
              visible={isOpenedProfileMenu}
              onClose={() => setIsOpenedProfileMenu(!isOpenedProfileMenu)}
              username={user.username}
              discriminator={user.discriminator}
            />
          )}
        </View>
        <Image source={logoImg} style={styles.logo} />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar."
        />

        <FlatList
          data={game}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGameScreen(item)} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
