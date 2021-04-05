import express from "express";
import { ordersRouter } from "./src/api/userOrders.get";
import { orderStatusRouter } from "./src/api/orderStatus.get";

const app = express();
const port = 4000;

app.use(express.json());

app.get("*", (_req, res) => {
  res.sendStatus(404);
});
app.use("/orders", ordersRouter);
app.use("/status", orderStatusRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
