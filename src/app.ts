import express, { Request, Response, Application, NextFunction } from "express";
import routes from "./routes/index";
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
var cors = require("cors");

const app: Application = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

interface error {
  status: number;
  message: string;
}
app.use((err: error, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

app.use("/", routes);

export default app;
