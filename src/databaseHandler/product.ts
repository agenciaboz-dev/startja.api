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
          codigo_externo: data.codigo_externo,
          icmsOrigin: data.icmsOrigin,
          user_id: data.user_id,
      },
  })
};

const update = async (data: Partial<NewProduct>, id: number) =>
    await prisma.product.update({
        where: { id },
        data: {
            ...data,
            ncm: data.ncm ? normalize(data.ncm) : undefined,
        },
    })

const remove = async (id: number) => await prisma.product.delete({ where: { id } })

const toggle = async (id: number) => {
    const current_value = await prisma.product.findUnique({ where: { id }, select: { active: true } })
    return await prisma.product.update({ where: { id }, data: { active: !current_value?.active } })
}

export default { list, create, update, remove, toggle }
