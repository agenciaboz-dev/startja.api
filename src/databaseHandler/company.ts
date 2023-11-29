import normalize from "../io/formatting";
import { Company, PrismaClient } from "@prisma/client";
import { NewCompany } from "../definitions/userOperations";
import nota from "./nota"

const prisma = new PrismaClient()

const include = { notas: { include: nota.include } }

// Função para listar todas as empresas
const list = async () => await prisma.company.findMany({ include })

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
          customerId: data.customerId
      },
      include
  })
};

const get = async (id: number) => await prisma.company.findUnique({ where: { id }, include })

export default { include, list, create, get }
