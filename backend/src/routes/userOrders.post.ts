import { Router, Response, NextFunction } from "express";
import { isNotEmail } from "../utils/helpers";
import { AppRequest } from "../types/index";
import { createReadStream } from "fs";
import { OrderTracking, UserOdersGetRequest } from "../types";
import csv from "csv-parser";
import path from "path";

const validator = (req: AppRequest, res: Response, next: NextFunction): Response | void => {
  const { email } = req.body;

  if (!email || typeof email !== "string" || isNotEmail(email)) {
    return res.sendStatus(400);
  }

  next();
};

const route = async (req: UserOdersGetRequest, res: Response) => {
  const {
    body: { email },
  } = req;

  const fileContents: OrderTracking[] = [];

  await new Promise((_resolve) => {
    createReadStream(path.resolve(__dirname, "../data/trackings.csv"))
      .on("error", (error) => {
        console.log(error);
        return res.sendStatus(500);
      })
      .pipe(csv({ separator: ";" }))
      .on("data", (data: OrderTracking) => {
        if (data.email === email) fileContents.push(data);
      })
      .on("end", () => {
        return res.json(fileContents);
      });
  });
};

export const ordersRouter = Router().post("/", validator, route);
