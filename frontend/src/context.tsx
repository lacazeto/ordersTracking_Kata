import React from "react";
import { OrderTracking, LatestCheckPoints } from "@order-management-kata/backend/src/types/index";

interface OrderDataContext {
  orders: OrderTracking[] | null;
  setOrders: React.Dispatch<React.SetStateAction<OrderTracking[] | null>>;
  checkPoints: LatestCheckPoints | null;
  setCheckpoints: React.Dispatch<React.SetStateAction<LatestCheckPoints | null>>;
}

export const orderDataContext = React.createContext<OrderDataContext>({
  orders: null,
  setOrders: () => undefined,
  checkPoints: null,
  setCheckpoints: () => undefined,
});

export const OrderDataContextProvider: React.FC = ({ children }) => {
  const [orders, setOrders] = React.useState<OrderTracking[] | null>(null);
  const [checkPoints, setCheckpoints] = React.useState<LatestCheckPoints | null>(null);

  return (
    <orderDataContext.Provider value={{ orders, checkPoints, setOrders, setCheckpoints }}>
      {children}
    </orderDataContext.Provider>
  );
};
