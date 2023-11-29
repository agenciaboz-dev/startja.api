import normalize from "../io/formatting";
import { Company, PrismaClient } from "@prisma/client";
import { NewCompany } from "../definitions/userOperations";

const prisma = new PrismaClient();

// Função para listar todas as empresas
const list = async () => await prisma.company.findMany();

// Função para criar uma nova empresa
const create = async (data: NewCompany) => {
  return await prisma.company.create({
    data: {
      type: data.type,
      name: data.name,
      document: normalize(data.document),
      iine: normalize(data.iine),
      city: data.city,
      state: data.state,
      district: data.district,
      street: data.street,
      adjunct: data.adjunct,
      number: data.number,
      cep: normalize(data.cep),
      email: normalize(data.email),
      phone: normalize(data.phone),
      customerId: data.customerId,
    },
  });
};

export default { list, create };
