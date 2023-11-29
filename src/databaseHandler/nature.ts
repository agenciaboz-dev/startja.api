import { Natureza, PrismaClient } from "@prisma/client";
import { NewNature } from "../definitions/userOperations";

const prisma = new PrismaClient();

// Funções relacionadas as naturezas ⬇️

const nature = {
  // Função para listar todas as naturezas
  list: async () =>
    await prisma.natureza.findMany({
      include: { rules: true },
    }),
  // Função para criar uma nova natureza
  create: async (data: NewNature) => {
    const { rules, ...naturezaData } = data;

    const createData = {
      ...naturezaData,
      rules: {
        connect: rules.map((rule: { id: number }) => ({ id: rule.id })),
      },
    };

    return await prisma.natureza.create({
      data: createData,
      include: { rules: true },
    });
  },
};

export default { nature };
