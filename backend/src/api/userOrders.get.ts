import { Router, Request, Response, NextFunction } from "express";
import { isNotEmail } from "../utils/helpers";
import { readFileSync } from "fs";
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

const route = (req: UserOdersGetRequest, res: Response) => {
  // const {
  //   body: { email },
  // } = req;

  let fileContents;
  try {
    fileContents = readFileSync(path.resolve(__dirname, "../data/trackings.csv"), "utf8");
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }

  return res.json(fileContents);
};

export const ordersRouter = Router().post("/", validator, route);
