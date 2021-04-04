import { Router, Request, Response, NextFunction } from "express";
import { AppRequest } from "../types/index";
import { createReadStream } from "fs";
import { Checkpoint } from "../types";
import csv from "csv-parser";
import path from "path";

interface orderCheckpointsRequest extends Request {
  body: {
    trackingNumber: string;
  };
}
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

  const fileContents: Checkpoint[] = [];

  await new Promise((resolve) => {
    createReadStream(path.resolve(__dirname, "../data/checkpoints.csv"))
      .on("error", (error) => {
        console.log(error);
        return res.sendStatus(500);
      })
      .pipe(csv({ separator: ";" }))
      .on("data", (data: Checkpoint) => {
        if (data.tracking_number === trackingNumber) fileContents.push(data);
      })
      .on("end", () => {
        resolve(fileContents);
      });
  });

  return res.json(fileContents);
};

export const orderCheckpointsRouter = Router().post("/", validator, route);
