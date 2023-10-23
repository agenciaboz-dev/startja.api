import { Admin, Customer, PrismaClient } from "@prisma/client";
import { Socket } from "socket.io";

const prisma = new PrismaClient();
const io = require("socket.io")(4109); // Replace with your Socket.io server configuration

// Emit the user list when the "user:list" event is received
io.on("connection", (socket: Socket) => {
  socket.on("user:list", async () => {
    try {
      const customers = await prisma.customer.findMany();
      const admins = await prisma.admin.findMany();
      // Emit the "user:list" event with the user data
      socket.emit("user:list", { admins, customers });
    } catch (error) {
      console.error("Erro ao buscar lista de usuários:", error);
    }
  });
});
