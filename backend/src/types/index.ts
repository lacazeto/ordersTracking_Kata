/* eslint-disable camelcase */
import { Request } from "express";

export type Tracking = {
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

export interface AppRequest extends Request {
  body: Record<string, unknown>;
}
