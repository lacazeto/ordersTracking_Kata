import express from "express";
import { ordersRouter } from "./src/routes/userOrders.post";
import { orderStatusRouter } from "./src/routes/orderStatus.post";

const app = express();
const port = 4000;

app.use(express.json());

app.get("*", (_req, res) => {
  res.sendStatus(404);
});
app.use("/orders", ordersRouter);
app.use("/status", orderStatusRouter);

const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

export default server;
