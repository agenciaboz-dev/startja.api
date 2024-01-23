import { Natureza, PrismaClient } from "@prisma/client";
import { NatureForm } from "../definitions/userOperations"

const prisma = new PrismaClient()

const include = { rules: { include: { product: true } } }

// Funções relacionadas as naturezas ⬇️

// Função para listar todas as naturezas
const list = async () => await prisma.natureza.findMany({ include })

const create = async (data: NatureForm) =>
    await prisma.natureza.create({
        data: {
            emissionFinality: data.emissionFinality,
            finality: data.finality,
            motive: data.motive,
            operation: data.operation,
            type: data.type,
            rules: {
                create: data.rules.map((rule) => ({
                    aliquota: rule.aliquota,
                    cfop: rule.cfop,
                    cofins_situacao_tributaria: rule.cofins_situacao_tributaria,
                    destino: rule.destino,
                    icms_modalidade_base_calculo: rule.icms_modalidade_base_calculo,
                    icms_situacao_tributaria: rule.icms_situacao_tributaria,
                    origem: rule.origem,
                    pis_situacao_tributaria: rule.pis_situacao_tributaria,
                    product_id: rule.product_id
                }))
            }
        },
        include
    })

const toggle = async (id: number) => {
    const current_value = await prisma.natureza.findUnique({ where: { id }, select: { active: true } })
    return await prisma.natureza.update({ where: { id }, data: { active: !current_value?.active }, include })
}

export default { include, list, create, toggle }
