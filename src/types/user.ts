export interface User {
  telegramId: number;
  username?: string;
  profile: {
    name?: string;
    age?: number;
    interests?: string[];
  };
  coins: number;
  referralCode?: string;
}
