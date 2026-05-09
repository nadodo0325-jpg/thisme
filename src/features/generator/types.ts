export type PersonalityCard = {
  title: string;

  love: string;

  dark: string;

  friends: string;

  tags?: string;
};

export type FavoritePersonality = {
  id: string;

  card: PersonalityCard;

  mode: string;

  createdAt: string;
};

export type PublicPersonalityPost = {
  id: string;

  author?: string;

  mode: string;

  likes: number;

  createdAt: string;

  card: PersonalityCard;
};

export type PersonalityMode =
  | "love"
  | "dark"
  | "friends"
  | "roast"
  | "mbti"
  | "pastlife";