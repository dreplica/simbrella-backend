import WebSocket from "ws";
import http from "http";

let wsContext: WebSocket.Server | null = null;
let wsReceiver: WebSocket | null = null;

const initWsSocket = (server: http.Server) => {
  wsContext = new WebSocket.Server({ server });
  wsContext.on("connection", (ws: WebSocket) => {
    wsReceiver = ws;
    wsReceiver.on("message", (message) => {
      console.log("Received message:", message);
    });
  });
};

const wsServer = {
  initWsSocket,
  wsContext,
  wsReceiver,
};

export default wsServer;
