import { AxiosResponse } from "./types/index";
import axios from "axios";
import { OrderTracking, LatestCheckPoints } from "@order-management-kata/backend/src/types/index";

export const fetchOrdersData = async (email: string): Promise<[OrderTracking[], LatestCheckPoints | null]> => {
  let orders = [];
  let ordersLatestCheckPoints = null;

  const ordersRes: AxiosResponse<OrderTracking[]> = await axios.post("/orders", { email });
  orders = ordersRes.data;

  if (orders.length > 0) {
    const trackingNumbers = orders.map((order) => order.tracking_number);
    const ordersLatestCheckPointsRes: AxiosResponse<LatestCheckPoints> = await axios.post("/status", {
      trackingNumbers,
    });
    ordersLatestCheckPoints = ordersLatestCheckPointsRes.data;
  }

  return [orders, ordersLatestCheckPoints];
};
