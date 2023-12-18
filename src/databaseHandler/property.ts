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
      series: data.series,
    },
  });
};

export default { list, create };
