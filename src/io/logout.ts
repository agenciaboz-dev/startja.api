import { Socket } from "socket.io";
import { PrismaClient } from "@prisma/client";
import { ClientBag } from "../definitions/client";

const prisma = new PrismaClient();

// In your logout logic, you can access the user information from the `Client` object.
export const logout = async (socket: Socket, clients: ClientBag) => {
    try {
      const client = clients.get(socket);
      if (client) {
        const user = client.user; // Access the user information
        clients.remove(client);
        socket.emit("logout:success", user); // Emit the user who is logged out
      } else {
        socket.emit("logout:error", "Client not found");
      }
    } catch (error) {
      console.log(error);
      socket.emit("logout:error", error);
    }
  };
  