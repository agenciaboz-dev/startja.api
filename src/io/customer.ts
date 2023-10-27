import { Customer, PrismaClient, DigitalCertificate } from "@prisma/client";
import { Socket } from "socket.io";

const prisma = new PrismaClient();

// Função que lista os clientes
const list = async (socket: Socket) => {
  const customers = await prisma.customer.findMany();
  socket.emit("customer:list", customers);
};

export default { list };
