import * as express from "express";
import * as bodyParser from "body-parser"
import * as cors from "cors"
import * as helmet from "helmet"

import orderRoutes from "../routes/orders"

const app: express.Application = express();

app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (request: express.Request, response: express.Response) => {
  response.status(200).send();
})

app.use("/orders", orderRoutes);
export default app;