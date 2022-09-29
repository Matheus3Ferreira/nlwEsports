import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../../components/Background";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DuoMatch } from "../../components/DuoMatch";

import { styles } from "./styles";
import { IGameParams } from "../../@types/@navigation";
import { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity, View, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { THEME } from "../../theme";

import logoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";

export function Game() {
  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.1.5:3333/api/ads/${adsId}/discord`)
      .then((response) => response.json())
      .then((data) => {
        setDiscordSelected(data.discord);
      });
  }

  useEffect(() => {
    fetch(`http://192.168.1.5:3333/api/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => {
        setAds(data);
      });
  }, []);

  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as IGameParams;
  const [ads, setAds] = useState<DuoCardProps[]>([]);
  const [discordSelected, setDiscordSelected] = useState<string>("");

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          {/* This view is just to space between return icon and logo, so logo gonna be in center */}
          <View style={styles.right}></View>
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />
        <FlatList
          data={ads}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[
            ads.length > 0 ? styles.contentList : styles.emptyListContent,
          ]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios para esse jogo... Mas isso não é problema!
            </Text> //Colocar uma imagem de fundo, e trocar o texto.
          )}
        />
        <DuoMatch
          visible={discordSelected ? true : false}
          discord={discordSelected}
          onClose={() => setDiscordSelected("")}
        />
      </SafeAreaView>
    </Background>
  );
}
