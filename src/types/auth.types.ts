export type AuthMessage = {
  email: string;
  password: string;
  secondPassword: string;
  userName: string;
};

export type registerFormData = {
  email: string;
  password: string;
  secondPassword: string;
  username: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type ProfileData = {
  id: number;
  username: string;
  bio: string;
  avatarUrl: string;
  profileBgUrl: string;
  quizCount: number;
  articleCount: number;
  followers: number;
};

export type ProfileFormData = {
  id: number;
  username: string;
  bio: string;
  avatarUrl: string;
  profileBgUrl: string;
};

export type userCardData = {
  id: number;
  username: string;
  avatarUrl: string;
  bio: string;
};
