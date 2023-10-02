export interface Game {
  key: string;
  title: string;
  gameKey?: string;
  provider: string;
  real: string | string[];
  collections: {
    popularity: number;
  };
}
