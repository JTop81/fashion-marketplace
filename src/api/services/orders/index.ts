import { ORDERS_URL } from "api/constants/endpoints.constants";
import axios from "axios";

// TODO: Update with adapter. This method is not used
export const getOrders = async () => {
  const response = await axios.get(ORDERS_URL);

  return response.data;
};
