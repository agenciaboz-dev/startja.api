import { PrismaClient, Company } from "@prisma/client";
import { Socket } from "socket.io";

const prisma = new PrismaClient();

// Função para listar companhias existentes
const list = async (socket: Socket) => {
  const company = await prisma.company.findMany({
    include: { customer: true },
  });
  socket.emit("company:list", company);
};

// Função para criar novas companhias
export const create = async (socket: Socket, data: Company) => {
  console.log(data);
  try {
    const company = await prisma.company.create({
      data: {
        name: data.name,
        cnpj: data.cnpj,
        city: data.city,
        state: data.state,
        customerId: data.customerId,
      },
    });

    if (company) {
      socket.emit("creation:success", company);
    } else {
      socket.emit("creation:invalid", "Input valid company data");
    }
  } catch (error) {
    socket.emit("creation:error", error);
  }
};

export default { list, create };
