import {
  Natureza,
  regraTributacao,
  PrismaClient,
  Product,
} from "@prisma/client";
import { Socket } from "socket.io";

const prisma = new PrismaClient();

export const list = async (socket: Socket) => {
  try {
    // Fetch naturezaOperacao with associated rules
    const naturezas = await prisma.natureza.findMany({
      include: { rules: { include: { natures: true } } },
    });

    const regras = await prisma.regraTributacao.findMany({
      include: { natures: true, products: true },
    });

    if (naturezas && regras) {
      socket.emit("nature:list", {
        naturezas: naturezas,
        regras: regras,
      });
    }
  } catch (error) {
    console.error("Error fetching Naturezas and Regras:", error);
    socket.emit("nature:error", error);
  }
};

// Criar natureza de operacao
const createNatureza = async (
  socket: Socket,
  data: {
    operation: string;
    type: string;
    finality: string;
    motive: string;
    rules: { id: number }[];
  }
) => {
  const rules = data.rules;
  try {
    const natureza = await prisma.natureza.create({
      data: {
        operation: data.operation,
        type: data.type,
        finality: data.finality,
        motive: data.motive,
        rules: { connect: rules.map((rule) => ({ id: rule.id })) },
      },
      include: { rules: true },
    });
    if (natureza) {
      socket.emit("nature:success", natureza);
    }
  } catch (error) {
    console.error("Error creating Natureza:", error);
    socket.emit("nature:error", error);
  }
};

// Criar regra de tributacao
const createRule = async (
  socket: Socket,
  data: {
    uf: string;
    icms: string;
    cfop: string;
    percentage: string;
    motive: string;
    rate: string;
    deferral: string;
    cst: string;
    cofins: string;
    natures: { id: number }[];
    products: { id: number }[];
  }
) => {
  const natures = data.natures;
  const products = data.products;

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
        natures: { connect: natures.map((nature) => ({ id: nature.id })) },
        products: { connect: products.map((product) => ({ id: product.id })) },
      },
    });
    if (rule) {
      socket.emit("rule:success", rule);
    }
  } catch (error) {
    console.error("Error creating Rule:", error);
    socket.emit("rule:error", error);
  }
};

export default { list, createNatureza, createRule };
