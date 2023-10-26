import { PrismaClient, Company } from "@prisma/client";
import { Socket } from "socket.io";

const prisma = new PrismaClient();

// FUNÇÃO PARA LISTAR COMPANIAS EXISTENTES
const list = async (socket: Socket) => {
  const company = await prisma.company.findMany();
  socket.emit("company:list", company);
};

// FUNÇÃO PARA CADASTRAR COMPANIAS
export const register = async (socket: Socket, data: Company) => {
  try {
    const user = await prisma.company.create({
      data: {
        name: data.name,
        cnpj: data.cnpj,
        city: data.city,
        state: data.state,
        customerId: data.customerId,
      },
    });

    if (user) {
      socket.emit("signup:success", user);
    } else {
      socket.emit("signup:error", "Input valid user data");
    }
  } catch (error) {
    socket.emit("signup:error", error);
  }
};

export default { list, register };
