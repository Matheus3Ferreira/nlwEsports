export interface IAdSchema {
  id: string;
  gameId?: string;
  name: string;
  yearsPlaying: number;
  weekDays: string;
  hourStart: number;
  hourEnd: number;
  useVoiceChannel: boolean;
  discord: string;
}

export interface IAdRequestResponse
  extends Omit<IAdSchema, "weekDays" | "hourStart" | "hourEnd"> {
  weekDays: string[];
  hourStart: string;
  hourEnd: string;
}
