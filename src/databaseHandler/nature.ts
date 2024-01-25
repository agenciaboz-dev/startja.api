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
                    product_id: rule.product_id,
                    cest: rule.cest,
                    codigo_beneficio_fiscal: rule.codigo_beneficio_fiscal,
                    icms_aliquota_st: rule.icms_aliquota_st,
                    icms_origem: rule.icms_origem,
                    icms_percentual_diferimento: rule.icms_percentual_diferimento,
                    icms_reducao_base_calculo: rule.icms_reducao_base_calculo,
                    icms_valor_desonerado: rule.icms_valor_desonerado,
                    pis_base_calculo: rule.pis_base_calculo,
                    pis_aliquota_porcentual: rule.pis_aliquota_porcentual,
                    pis_aliquota_valor: rule.pis_aliquota_valor,
                    pis_valor: rule.pis_valor,
                    pis_quantidade_vendida: rule.pis_quantidade_vendida,
                    cofins_base_calculo: rule.cofins_base_calculo,
                    cofins_aliquota_porcentual: rule.cofins_aliquota_porcentual,
                    cofins_aliquota_valor: rule.cofins_aliquota_valor,
                    cofins_valor: rule.cofins_valor,
                    cofins_quantidade_vendida: rule.cofins_quantidade_vendida
                }))
            }
        },
        include
    })

const update = async (id: number, data: NatureForm) => {
    const old_rules = await prisma.regraTributacao.deleteMany({ where: { natureza_id: id } })
    return await prisma.natureza.update({
        where: { id },
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
                    product_id: rule.product_id,
                    cest: rule.cest,
                    codigo_beneficio_fiscal: rule.codigo_beneficio_fiscal,
                    icms_aliquota_st: rule.icms_aliquota_st,
                    icms_origem: rule.icms_origem,
                    icms_percentual_diferimento: rule.icms_percentual_diferimento,
                    icms_reducao_base_calculo: rule.icms_reducao_base_calculo,
                    icms_valor_desonerado: rule.icms_valor_desonerado,
                    pis_base_calculo: rule.pis_base_calculo,
                    pis_aliquota_porcentual: rule.pis_aliquota_porcentual,
                    pis_aliquota_valor: rule.pis_aliquota_valor,
                    pis_valor: rule.pis_valor,
                    pis_quantidade_vendida: rule.pis_quantidade_vendida,
                    cofins_base_calculo: rule.cofins_base_calculo,
                    cofins_aliquota_porcentual: rule.cofins_aliquota_porcentual,
                    cofins_aliquota_valor: rule.cofins_aliquota_valor,
                    cofins_valor: rule.cofins_valor,
                    cofins_quantidade_vendida: rule.cofins_quantidade_vendida
                }))
            }
        },
        include
    })
}

const toggle = async (id: number) => {
    const current_value = await prisma.natureza.findUnique({ where: { id }, select: { active: true } })
    return await prisma.natureza.update({ where: { id }, data: { active: !current_value?.active }, include })
}

export default { include, list, create, toggle, update }
