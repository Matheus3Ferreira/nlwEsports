import { TouchableOpacity, View, Text } from "react-native";
import { THEME } from "../../theme";
import { DuoInfo } from "../DuoInfo";
import { GameController } from "phosphor-react-native";

import { styles } from "./styles";

export interface DuoCardProps {
  id: string;
  name: string;
  hourEnd: number;
  hourStart: number;
  weekDays: string[];
  yearsPlaying: number;
  useVoiceChannel: boolean;
  discord: string;
}

interface Props {
  data: DuoCardProps;
  onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo label={"Nome"} value={data.name} />
      <DuoInfo
        label={"Tempo de jogo"}
        value={`${data.yearsPlaying} ${
          data.yearsPlaying == 1 ? "ano" : "anos"
        }`}
      />
      <DuoInfo
        label={"Disponibilidade"}
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />
      <DuoInfo
        label={"Chamada de áudio?"}
        value={data.useVoiceChannel ? "Sim" : "Não"}
        colorValue={
          data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }
      />

      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController size={20} color={THEME.COLORS.TEXT} />
        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}
