export enum OrderStatus {
  allOrders = "all",
  unpaid = "unpaid",
  paid = "paid",
  shipped = "shipped",
  completed = "completed",
  inDispute = "inDispute",
  pendingReviews = "pendingReviwes",
  cancelled = "cancelled",
}

export type OrderStatusVal = {
  label: string;
  value: OrderStatus;
};

export interface OrderTimeRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface OrderFilterState {
  orderStatus: OrderStatusVal;
  searchText: string;
  orderTimeRange: OrderTimeRange;
  priceRange: number[];
  rating: number;
}
