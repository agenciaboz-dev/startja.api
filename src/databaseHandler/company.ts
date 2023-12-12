import normalize from "../io/formatting";
import { PrismaClient } from "@prisma/client";
import { NewCompany } from "../definitions/userOperations";
import nota from "./nota";

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
      inscricaoEstadual: normalize(data.inscricaoEstadual),
      indicadorEstadual: data.indicadorEstadual,
      city: data.city,
      state: data.state,
      district: data.district,
      street: data.street,
      adjunct: data.adjunct,
      number: data.number,
      cep: normalize(data.cep),
      email: normalize(data.email),
      phone: data.phone,
      customerId: data.customerId,
    },
  });
};

const get = async (id: number) =>
  await prisma.company.findUnique({ where: { id } });

export default { list, create, get };
