import { CiDollar } from "react-icons/ci";
import { FaFlagCheckered } from "react-icons/fa6";
import { LuPackageX } from "react-icons/lu";
import { PiShoppingCartSimple } from "react-icons/pi";
import { RiTruckLine } from "react-icons/ri";
import { TbMessage2Exclamation } from "react-icons/tb";

import {
  OrderFilterState,
  OrderStatus,
} from "pages/seller-home/orders/orders-page.types";

export const ordersStatus = [
  {
    title: "All Orders",
    iconColor: "rgba(159, 0, 217, 0.2)",
    icon: <PiShoppingCartSimple />,
  },
  {
    title: "Unpaid",
    iconColor: "rgba(255, 110, 65, 0.2)",
    icon: <CiDollar />,
  },
  {
    title: "Shipped",
    iconColor: "rgba(43, 62, 235, 0.2)",
    icon: <RiTruckLine />,
  },
  {
    title: "In Dispute",
    iconColor: "rgba(159, 0, 217, 0.2)",
    icon: <TbMessage2Exclamation />,
  },
  {
    title: "Completed",
    iconColor: "rgba(4, 129, 55, 0.2)",
    icon: <FaFlagCheckered />,
  },
  {
    title: "Cancelled",
    iconColor: "rgba(222, 14, 14, 0.2)",
    icon: <LuPackageX />,
  },
];

export const ordersStatusBtns = [
  { label: "All Orders", value: OrderStatus.allOrders },
  { label: "Unpaid", value: OrderStatus.unpaid },
  { label: "Paid", value: OrderStatus.paid },
  { label: "Shipped", value: OrderStatus.shipped },
  { label: "Completed", value: OrderStatus.completed },
];

export const filterInitialState: OrderFilterState = {
  orderStatus: ordersStatusBtns[0],
  searchText: "",
  orderTimeRange: {
    startDate: new Date(),
    endDate: null,
  },
  priceRange: [200, 600],
  rating: 0,
};

export const searchTextInputName = "searchText";
