import normalize from "../io/formatting";
import { Property, PrismaClient } from "@prisma/client";
import { NewProperty } from "../definitions/userOperations";

const prisma = new PrismaClient();

const inclusions = {
  customer: { certificate: true, companies: true },
};

// Funções relacionadas as Propriedades ⬇️
const list = async () => {
  return await prisma.property.findMany();
};

const create = async (data: NewProperty) => {
  return await prisma.property.create({
      data: {
          ie: data.ie,
          nifr: data.nifr,
          cep: normalize(data.cep),
          city: data.city,
          state: data.state,
          street: data.street,
          number: data.number,
          adjunct: data.adjunct,
          district: data.district,
          exploration: data.exploration,
          declarant: data.declarant,
          nfe_number: data.nfe_number,
          nfe_series: data.nfe_series,
          user_id: data.user_id,
          name: data.name
      }
  })
};

const update = async (data: Partial<NewProperty>, id: number) =>
    await prisma.property.update({
        where: { id },
        data: {
            ...data,
            cep: data.cep ? normalize(data.cep) : undefined,
        },
    })

const get = async (id: number) => await prisma.property.findUnique({ where: { id } })

const advanceNfeNumber = async (id: number, authorized_number: string) => {
    const next_number = Number(authorized_number) + 1
    return await prisma.property.update({ where: { id }, data: { nfe_number: next_number.toString() } })
}

const remove = async (id: number) => await prisma.property.delete({ where: { id } })

export default { list, create, update, get, advanceNfeNumber, remove }
