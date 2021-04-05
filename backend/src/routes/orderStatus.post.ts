import { Router, Response, NextFunction } from "express";
import { AppRequest } from "../types/index";
import { createReadStream } from "fs";
import { OrderStatus, OrderStatusRequest, LatestCheckPoints } from "../types";
import csv from "csv-parser";
import path from "path";

const validator = (req: AppRequest, res: Response, next: NextFunction): Response | void => {
  const { trackingNumbers } = req.body;

  if (!trackingNumbers || !Array.isArray(trackingNumbers) || trackingNumbers.length < 1) {
    return res.sendStatus(400);
  }

  for (const element of trackingNumbers) {
    if (typeof element !== "string") return res.sendStatus(400);
  }

  next();
};

const route = async (req: OrderStatusRequest, res: Response) => {
  const {
    body: { trackingNumbers },
  } = req;

  const fileTrackings: { [key: string]: OrderStatus[] } = {};

  await new Promise((_resolve) => {
    createReadStream(path.resolve(__dirname, "../data/checkpoints.csv"))
      .on("error", (error) => {
        console.log(error);
        return res.sendStatus(500);
      })
      .pipe(csv({ separator: ";" }))
      .on("data", (data: OrderStatus) => {
        if (trackingNumbers.includes(data.tracking_number)) {
          fileTrackings[data.tracking_number] = fileTrackings[data.tracking_number] || [];
          fileTrackings[data.tracking_number].push(data);
        }
      })
      .on("end", () => {
        const latestCheckpoints: LatestCheckPoints = {};

        for (const [key, value] of Object.entries(fileTrackings)) {
          fileTrackings[key] = value.sort((x, y) => Date.parse(y.timestamp) - Date.parse(x.timestamp));
          latestCheckpoints[key] = fileTrackings[key][0];
        }

        return res.json(latestCheckpoints);
      });
  });
};

export const orderStatusRouter = Router().post("/", validator, route);
