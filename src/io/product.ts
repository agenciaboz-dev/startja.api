import { PrismaClient, Product } from "@prisma/client";
import { Socket } from "socket.io";

const prisma = new PrismaClient();

// FUNÇÃO PARA LISTAR PRODUTOS EXISTENTES
const list = async (socket: Socket) => {
  const products = await prisma.product.findMany();
  socket.emit("product:list", products);
};

// Função de criação de novo produtos
export const createProduct = async (socket: Socket, data: Product) => {
  // Valida e formata o código NCM
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        ncm: data.ncm, // Usa o NCM formatado
      },
    });

    if (product) {
      socket.emit("product:success", product);
    }
  } catch (error) {
    socket.emit("product:error", error);
  }
};

export default { list, createProduct };
