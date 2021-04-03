import express from "express";
import * as routers from "./src/routers";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("*", (req, res) => {
  res.sendStatus(404);
});
app.use("/orders", routers.orders);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
