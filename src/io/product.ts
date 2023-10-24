import { PrismaClient } from "@prisma/client";
import { Socket } from "socket.io";

const prisma = new PrismaClient();

const list = async (socket: Socket) => {
  const products = await prisma.product.findMany();
  socket.emit("product:list", products);
};

export default { list };
