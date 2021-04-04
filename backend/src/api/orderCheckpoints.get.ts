import { Router, Response, NextFunction } from "express";
import { AppRequest } from "../types/index";
import { createReadStream } from "fs";
import { OrderCheckpoint, orderCheckpointsRequest } from "../types";
import csv from "csv-parser";
import path from "path";

const validator = (req: AppRequest, res: Response, next: NextFunction): Response | void => {
  const { trackingNumber } = req.body;

  if (!trackingNumber || typeof trackingNumber !== "string" || trackingNumber.length < 1) {
    return res.sendStatus(400);
  }

  next();
};

const route = async (req: orderCheckpointsRequest, res: Response) => {
  const {
    body: { trackingNumber },
  } = req;

  const fileContents: OrderCheckpoint[] = [];

  await new Promise((resolve) => {
    createReadStream(path.resolve(__dirname, "../data/checkpoints.csv"))
      .on("error", (error) => {
        console.log(error);
        return res.sendStatus(500);
      })
      .pipe(csv({ separator: ";" }))
      .on("data", (data: OrderCheckpoint) => {
        if (data.tracking_number === trackingNumber) fileContents.push(data);
      })
      .on("end", () => {
        fileContents.sort((x, y) => Date.parse(x.timestamp) - Date.parse(y.timestamp));
        resolve(fileContents);
      });
  });

  return res.json(fileContents);
};

export const orderCheckpointsRouter = Router().post("/", validator, route);
