import { PrismaClient, Product } from "@prisma/client";
import { Socket } from "socket.io";

const prisma = new PrismaClient();

const list = async (socket: Socket) => {
  const products = await prisma.product.findMany();
  socket.emit("product:list", products);
};

export const createProduct = async (socket: Socket, data: Product) => {
  try {
    const user = await prisma.product.create({
      data: {
        name: data.name,
        ncm: data.ncm,
      },
    });

    if (user) {
      socket.emit("product:success", user);
    } else {
      socket.emit("product:error", "Input valid user data");
    }
  } catch (error) {
    socket.emit("product:error", error);
  }
};

export default { list, createProduct };
