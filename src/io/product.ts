import { PrismaClient, Product } from "@prisma/client";
import { Socket } from "socket.io";

const prisma = new PrismaClient();

// FUNÇÃO PARA LISTAR PRODUTOS EXISTENTES
const list = async (socket: Socket) => {
  const products = await prisma.product.findMany();
  socket.emit("product:list", products);
};

// Função para validar e formatar o NCM
function validateNCM(ncm: string): string | null {
  // Limpa o código de pontuação desnecesária
  const cleanedNCM = ncm.replace(/[^0-9]/g, "");

  // Formata o código NCM limpo na seguinte estrutura de código: 0000.00.00
  if (cleanedNCM.length === 8) {
    return `${cleanedNCM.substr(0, 4)}.${cleanedNCM.substr(
      4,
      2
    )}.${cleanedNCM.substr(6, 2)}`;
  }
  return null;
}

// Função de criação de novo produtos
export const createProduct = async (socket: Socket, data: Product) => {
  // Valida e formata o código NCM
  const formattedNCM = validateNCM(data.ncm);

  if (!formattedNCM || formattedNCM.length === 8) {
    socket.emit("product:NCMfailure", "NCM Inválido");
    return;
  }

  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        ncm: formattedNCM, // Usa o NCM formatado
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
