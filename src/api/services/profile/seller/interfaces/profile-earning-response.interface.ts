export interface IProfileEarningResponse {
  earning: {
    amount: number;
    currency: string;
  };
  spending: {
    amount: number;
    currency: string;
  };
}
