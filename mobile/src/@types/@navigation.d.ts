export interface IGameParams {
  id: string;
  title: string;
  bannerUrl: string;
}

export interface IUserParams {
  avatar: string;
  email: string;
  id: string;
  username: string;
  discriminator: string;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: IUserParams;
      game: IGameParams;
    }
  }
}
