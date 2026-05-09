export type HistoryItem = {
  title: string;

  text: string;

  createdAt: string;
};

export type FavoriteItem = {
  id: string;

  title: string;

  tags?: string;

  mode: string;

  createdAt: string;
};

export type TrendingPersonality = {
  id: string;

  title: string;

  emoji: string;

  users: string;

  shares: string;

  mode: string;

  viral: boolean;

  description: string;

  tags: string[];

  input: string;
};

export type PublicPersonality = {
  id: string;

  title: string;

  description: string;

  mode: string;

  tags: string[];

  likes: number;

  shares: number;

  createdAt: string;

  username?: string;

  avatar?: string;

  verified?: boolean;
};