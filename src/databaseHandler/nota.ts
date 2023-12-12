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
      series: 922,
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
        createMany: {
          data: data.products.map((product) => ({
            unidadeComercial: product.unidadeComercial,
            unidadeTributavel: product.unidadeTributavel,
            productQnty: product.productQnty,
            unitaryComercialValue: product.unitaryComercialValue,
            unitaryTributableValue: product.unitaryTributableValue,
            produtoId: product.produtoId,
          })),
        },
      },
      rules: {
        connect: data.rules.map((rule) => ({ id: rule.id })),
      },
      company: { connect: { id: data.company.id } },
      property: { connect: { id: data.property.id } },
      nature: { connect: { id: data.nature.id } },
    },
    include,
  });
};

export default { list, create };
