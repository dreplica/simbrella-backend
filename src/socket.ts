import WebSocket from "ws";
import http from "http";
import { taskService } from "./services";
import { Realtime, TaskInterface } from "./@types/models";
import { filterSocketRequest } from "./services/socket";

let wsContext: WebSocket.Server | null = null;

const initWsSocket = (server: http.Server) => {
  wsContext = new WebSocket.Server({ server });

  wsContext.on("connection", (ws: WebSocket) => {
    console.log("New client connected");

    ws.on("message", async (message: string) => {
      console.log("Received message:"); 

      try {
        const data = Buffer.from(message, 'hex').toString('utf-8')
        const value = await filterSocketRequest(JSON.parse(data) as unknown as Realtime)

        wsContext?.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(value));
          }
        });
      } catch (error) {
        console.error("Error processing message:", error);
        ws.send(JSON.stringify({ error: 'Invalid message format' }));
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
};

// WebSocket server API
const wsServer = {
  initWsSocket,
};

export default wsServer;
