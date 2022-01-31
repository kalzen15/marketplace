export class User {
  id: number;
  email: string;
  password: string;
  name: string;
  token: string;
  walletItems: Array<any>;
  walletBalance: number;
  activeBids: Array<any>;
  engagedWalletBalance: number;
}
