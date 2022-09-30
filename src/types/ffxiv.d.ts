export declare type Topic = {
  description: string;
  id: string;
  image: string;
  time: string;
  timeStamp?: string;
  title: string;
  url: string;
};

export declare type Main = {
  id: string;
  url: string;
  title: string;
  time: string;
  timeStamp?: string;
  start: string;
  end: string;
  current?: boolean;
};

export declare type MainCurrent = {
  companion: Main[];
  game: Main[];
  lodestone: Main[];
  mog: Main[];
  psn: Main[];
};
