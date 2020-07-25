import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as helmet from "helmet";

import orderRoutes from "../routes/orders";
import userRoutes from "../routes/users";

const app: express.Application = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(helmet());
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (_, response: express.Response) => {
  response.status(200).send();
});

app.use("/orders", orderRoutes);
app.use("/users", userRoutes);

export default app;
