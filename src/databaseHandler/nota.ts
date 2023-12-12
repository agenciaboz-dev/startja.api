import { PrismaClient } from "@prisma/client";
import { NewNota } from "../definitions/userOperations";

const prisma = new PrismaClient();

const include = { nature: true, products: true, property: true };

const list = async () => {
  return await prisma.notaFiscal.findMany();
};

const create = async (data: NewNota) => {
  return await prisma.notaFiscal.create({
    data: {
      generalInfo: data.generalInfo,
      paymentCondition: data.paymentCondition,
      paymentType: data.paymentType,
      qtdParcelas: data.qtdParcelas,
      valorParcelas: data.valorParcelas,
      vencimentoParcelas: data.vencimentoParcelas,
      freteType: data.freteType,
      vehiclePlates: data.vehiclePlates,
      vehicleUf: data.vehicleUf,
      shippingCompany: data.shippingCompany,
      transportedProductQuantity: data.transportedProductQuantity,
      transportedProductType: data.transportedProductType,
      bruteWeightKg: data.bruteWeightKg,
      liquidWeightKg: data.liquidWeightKg,
      totalValue: data.totalValue,
      totalProductValue: data.totalProductValue,
      products: {
        connect: data.products.map((product) => ({ id: product.id })),
      },
      rules: {
        connect: data.rules.map((rule) => ({ id: rule.id })),
      },
      company: {}, // Add the missing 'company' property
      property: {}, // Add the missing 'property' property
      nature: {}, // Add the missing 'nature' property
    },
    include,
  });
};

export default { list, create };
