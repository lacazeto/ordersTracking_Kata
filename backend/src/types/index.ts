/* eslint-disable camelcase */
import { Request } from "express";

export type OrderTracking = {
  orderNo: string;
  tracking_number: string;
  courier: string;
  street: string;
  zip_code: string;
  city: string;
  destination_country_iso3: string;
  email: string;
  articleNo: string;
  articleImageUrl: string;
  quantity: string;
  product_name: string;
};

export type OrderStatus = {
  tracking_number: string;
  location: string;
  timestamp: string;
  status: string;
  status_text: string;
  status_details: string;
};

export type LatestCheckPoints = { [key: string]: OrderStatus };

export interface AppRequest extends Request {
  body: Record<string, unknown>;
}

export interface UserOdersGetRequest extends Request {
  body: {
    email: string;
  };
}

export interface OrderStatusRequest extends Request {
  body: {
    trackingNumbers: string[];
  };
}
