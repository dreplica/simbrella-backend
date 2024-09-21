import WebSocket from "ws";
import http from "http";
import { taskService } from "./services";
import { TaskInterface } from "./@types/models";

let wsContext: WebSocket.Server | null = null;

const initWsSocket = (server: http.Server) => {
  wsContext = new WebSocket.Server({ server });

  wsContext.on("connection", (ws: WebSocket) => {
    console.log("New client connected");

    ws.on("message", async (message: string) => {
      console.log("Received message:"); // Log the received message

      try {
        // const data = Buffer.from(message, 'hex').toString('utf-8')
        // // Process the task update if the type is valid
        // const response = null;
        // if (['title', 'description', 'status'].includes(payload.type)) {
        //   response = await taskService.updateTask(data.payload as TaskInterface);
        // }
        // // const response = JSON.stringify(payload);
        // console.log({message, response})

        // Broadcast the response to all connected clients
        wsContext?.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({people: 'from'}));
          }
        });
      } catch (error) {
        console.error("Error processing message:", error);
        // Optionally send an error response back to the client
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
