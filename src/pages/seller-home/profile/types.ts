export interface SellerProfileEarning {
  earning: BalanceData;
  spending: BalanceData;
}

export interface SellerProfileAvailableFunds extends BalanceData {}

export interface BalanceData {
  amount: number;
  currency: string;
}

export interface SellerProfileBrandInfo {
  brandLogo: string;
  name: string;
  bio: string;
  address1: string;
  address2: string;
  city: string;
  country: string;
  state: string;
}

export interface SellerProfileSellerInfo {
  username: string;
  email: string;
  phoneNumber: string;
}
