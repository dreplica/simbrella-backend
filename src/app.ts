import createError, { HttpError } from "http-errors";
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import routes from "./routes";

var app = express();

// view engine setup
app.use(
  cors({ origin: process.env.ALLOWED_ORIGINS || "http://localhost:5000" })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1", routes);

app.use(function (_req, _res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
