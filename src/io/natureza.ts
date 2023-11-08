import {
  Natureza,
  regraTributacao,
  PrismaClient,
  Product,
} from "@prisma/client";
import { Socket } from "socket.io";

const prisma = new PrismaClient();

// Função que lista as naturezas de operacao
export const list = async (socket: Socket) => {
  const naturezaOperacao = await prisma.natureza.findMany();
  socket.emit("natureza:list", naturezaOperacao); // Corrected the variable name
};

//  Criar natureza de operacao
export const createNatureza = async (socket: Socket, data: Natureza) => {
  try {
    const natureza = await prisma.natureza.create({
      data: {
        operation: data.operation,
        type: data.type,
        finality: data.finality,
        motive: data.motive,
        ruleId: data.ruleId,
      },
    });
    if (natureza) {
      socket.emit("natureza:success", natureza); // Corrected the event name
    }
  } catch (error) {
    socket.emit("natureza:error", error); // Corrected the event name
  }
};

//  Criar natureza de operacao
export const createRule = async (socket: Socket, data: regraTributacao) => {
  try {
    const rule = await prisma.regraTributacao.create({
      data: {
        uf: data.uf,
        icms: data.icms,
        cfop: data.cfop,
        percentage: data.percentage,
        motive: data.motive,
        rate: data.rate,
        deferral: data.deferral,
        cst: data.cst,
        cofins: data.cofins,
        product: {},
      },
    });
    if (rule) {
      socket.emit("rule:success", rule); // Corrected the event name
    }
  } catch (error) {
    socket.emit("rule:error", error); // Corrected the event name
  }
};

export default { list, createNatureza, createRule };
