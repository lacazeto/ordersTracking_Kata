import { Router, Response, NextFunction } from "express";
import { AppRequest } from "../types/index";
import { createReadStream } from "fs";
import { OrderStatus, orderStatusRequest } from "../types";
import csv from "csv-parser";
import path from "path";

const validator = (req: AppRequest, res: Response, next: NextFunction): Response | void => {
  const { trackingNumber } = req.body;

  if (!trackingNumber || typeof trackingNumber !== "string" || trackingNumber.length < 1) {
    return res.sendStatus(400);
  }

  next();
};

const route = async (req: orderStatusRequest, res: Response) => {
  const {
    body: { trackingNumber },
  } = req;

  const fileContents: OrderStatus[] = [];

  await new Promise((_resolve) => {
    createReadStream(path.resolve(__dirname, "../data/checkpoints.csv"))
      .on("error", (error) => {
        console.log(error);
        return res.sendStatus(500);
      })
      .pipe(csv({ separator: ";" }))
      .on("data", (data: OrderStatus) => {
        if (data.tracking_number === trackingNumber) fileContents.push(data);
      })
      .on("end", () => {
        fileContents.sort((x, y) => Date.parse(x.timestamp) - Date.parse(y.timestamp));
        return res.json(fileContents[fileContents.length - 1]);
      });
  });
};

export const orderStatusRouter = Router().post("/", validator, route);
