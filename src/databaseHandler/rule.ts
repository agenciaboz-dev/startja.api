import normalize from "../io/formatting";
import { regraTributacao, PrismaClient } from "@prisma/client";
import { NewRule } from "../definitions/userOperations";

const prisma = new PrismaClient();

// Funções relacionadas as regras de tributação ⬇️
const include = { products: true }

// Função para listar todas as regras de tributação
const list = async () => {
    return await prisma.regraTributacao.findMany({
        include
    })
}
// função para criar uma nova regra de tributação
const create = async (data: NewRule) => {
    return await prisma.regraTributacao.create({
        data: {
            aliquota: data.aliquota,
            cfop: data.cfop,
            cofins_situacao_tributaria: data.cofins_situacao_tributaria,
            icms_modalidade_base_calculo: data.icms_modalidade_base_calculo,
            icms_origem: data.icms_origem,
            icms_situacao_tributaria: data.icms_situacao_tributaria,
            pis_situacao_tributaria: data.pis_situacao_tributaria,
            products: { connect: data.products.map((product) => ({ id: product.id })) }
        },
        include
    })
}

export default { list, create };
