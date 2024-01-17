import normalize from "../io/formatting";
import { Product, PrismaClient } from "@prisma/client";
import { NewProduct } from "../definitions/userOperations";

const prisma = new PrismaClient();

// Funções relacionadas aos produtos ⬇️

// Função para listar todos os produtos
const list = async () => {
  const product = await prisma.product.findMany({});

  return { product };
};
// Função para criar um novo produto
const create = async (data: NewProduct) => {
  console.log(data);
  return await prisma.product.create({
      data: {
          name: data.name,
          ncm: normalize(data.ncm),
          codigo_externo: data.codigo_externo
      }
  })
};

const update = async (data: NewProduct, id: number) =>
    await prisma.product.update({
        where: { id },
        data: {
            name: data.name,
            ncm: normalize(data.ncm),
            codigo_externo: data.codigo_externo
        }
    })

export default { list, create, update }
