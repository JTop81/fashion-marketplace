import { ANALYTICS_ORDERS_URL } from "api/constants/endpoints.constants";
import axios from "axios";

export const getOrderAnalytics = async () => {
  const response = await axios.get(ANALYTICS_ORDERS_URL);

  return response.data;
};
