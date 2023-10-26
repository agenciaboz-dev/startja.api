import { PrismaClient, Company } from "@prisma/client";
import { Socket } from "socket.io";

const prisma = new PrismaClient();

// FUNÇÃO PARA LISTAR COMPANIAS EXISTENTES
const list = async (socket: Socket) => {
  const company = await prisma.company.findMany({ include: { customer: true } })
  socket.emit("company:list", company);
};

// FUNÇÃO PARA CADASTRAR COMPANIAS
export const register = async (socket: Socket, data: Company) => {
    console.log(data)
    try {
        const company = await prisma.company.create({
            data: {
                name: data.name,
                cnpj: data.cnpj,
                city: data.city,
                state: data.state,
                customerId: data.customerId,
            },
        })

        if (company) {
            socket.emit("company:signup:success", company)
        } else {
            socket.emit("company:signup:error", "Input valid company data")
        }
    } catch (error) {
        console.log(error)
        socket.emit("company:signup:error", error)
    }
};

export default { list, register };
