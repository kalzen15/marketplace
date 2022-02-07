export class User {
  _id: string;
  email: string;
  password: string;
  name: string;
  token: string;
  walletItems: Array<any>;
  walletBalance: number;
  activeBids: Array<any>;
  engagedWalletBalance: number;
}
