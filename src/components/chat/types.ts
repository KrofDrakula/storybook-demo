export type User = {
  id: string;
  username: string;
  avatar: string | null;
};

export type Message = {
  timestamp: Date;
  userId: string;
  text: string;
};
