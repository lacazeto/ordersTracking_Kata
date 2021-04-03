import { Router, Request, Response, NextFunction } from "express";
import { isNotEmail } from "../utils/helpers";
import { createReadStream } from "fs";
import { Tracking } from "../types/orders";
import csv from "csv-parser";
import path from "path";

interface UserOdersGetRequest extends Request {
  body: {
    email?: string;
  };
}

const validator = (req: UserOdersGetRequest, res: Response, next: NextFunction): Response | void => {
  const { body } = req;
  const email = body?.email;

  if (!email || typeof email !== "string" || isNotEmail(email)) {
    return res.sendStatus(400);
  }

  next();
};

const route = async (req: UserOdersGetRequest, res: Response) => {
  const {
    body: { email },
  } = req;

  const fileContents: Tracking[] = [];

  await new Promise((resolve) => {
    createReadStream(path.resolve(__dirname, "../data/trackings.csv"))
      .on("error", (error) => {
        console.log(error);
        return res.sendStatus(500);
      })
      .pipe(csv({ separator: ";" }))
      .on("data", (data: Tracking) => {
        if (data.email === email) fileContents.push(data);
      })
      .on("end", () => {
        resolve(fileContents);
      });
  });

  return res.json(fileContents);
};

export const ordersRouter = Router().post("/", validator, route);
