import normalize from "../io/formatting";
import { regraTributacao, PrismaClient } from "@prisma/client";
import { NewRule } from "../definitions/userOperations";

const prisma = new PrismaClient();

// Funções relacionadas as regras de tributação ⬇️

  // Função para listar todas as regras de tributação
  const list = async () => {
      return await prisma.regraTributacao.findMany({
          include: { natures: true, products: true }
      })
  }
  // função para criar uma nova regra de tributação
  const create = async (data: NewRule) => {
      return await prisma.regraTributacao.create({
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
              natures: { connect: data.natures.map((nature) => ({ id: nature.id })) },
              products: {
                  connect: data.products.map((product) => ({ id: product.id }))
              }
          }
      })
  }

export default { list, create }
