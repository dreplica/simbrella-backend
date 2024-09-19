import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import http from "http";
import { HttpError } from "http-errors";
import mongoConnectionInit from "./db/connnection";
import wsServer from "./socket";

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = (val: string) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) return val;
  if (port >= 0) return port;

  return false;
};

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: HttpError) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  if (process.env["NODE_ENV"] !== "production") {
    console.log("Listening on " + bind);
  }
}

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
wsServer.initWsSocket(server);

mongoConnectionInit();
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
