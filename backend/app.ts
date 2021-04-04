import express from "express";
import { ordersRouter } from "./src/api/userOrders.get";
import { orderCheckpointsRouter } from "./src/api/orderCheckpoints.get";

const app = express();
const port = 3000;

app.use(express.json());

app.get("*", (_req, res) => {
  res.sendStatus(404);
});
app.use("/orders", ordersRouter);
app.use("/checkpoints", orderCheckpointsRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
