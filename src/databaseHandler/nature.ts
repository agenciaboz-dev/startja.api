import { Natureza, PrismaClient } from "@prisma/client";
import { NatureForm } from "../definitions/userOperations"

const prisma = new PrismaClient()

const include = { rules: { include: { products: true } }, user: true }

// Funções relacionadas as naturezas ⬇️

// Função para listar todas as naturezas
const list = async () => await prisma.natureza.findMany({ include })

const create = async (data: NatureForm) =>
    await prisma.natureza.create({
        data: {
            finality: data.finality,
            motive: data.motive,
            operation: data.operation,
            type: data.type,
            user_id: data.user_id,
            rules: {
                create: data.rules.map((rule) => ({
                    observations: rule.observations,
                    aliquota: rule.aliquota,
                    cfop: rule.cfop,
                    cofins_situacao_tributaria: rule.cofins_situacao_tributaria,
                    destino: rule.destino,
                    icms_modalidade_base_calculo: rule.icms_modalidade_base_calculo,
                    icms_situacao_tributaria: rule.icms_situacao_tributaria,
                    origem: rule.origem,
                    pis_situacao_tributaria: rule.pis_situacao_tributaria,
                    cest: rule.cest,
                    codigo_beneficio_fiscal: rule.codigo_beneficio_fiscal,
                    icms_aliquota_st: rule.icms_aliquota_st,
                    icms_origem: rule.icms_origem,
                    icms_percentual_diferimento: rule.icms_percentual_diferimento,
                    icms_reducao_base_calculo: rule.icms_reducao_base_calculo,
                    icms_valor_desonerado: rule.icms_valor_desonerado,
                    icms_margem_valor_adicionado_st: rule.icms_margem_valor_adicionado_st,
                    pis_base_calculo: rule.pis_base_calculo,
                    pis_aliquota_porcentual: rule.pis_aliquota_porcentual,
                    pis_aliquota_valor: rule.pis_aliquota_valor,
                    pis_valor: rule.pis_valor,
                    pis_quantidade_vendida: rule.pis_quantidade_vendida,
                    cofins_base_calculo: rule.cofins_base_calculo,
                    cofins_aliquota_porcentual: rule.cofins_aliquota_porcentual,
                    cofins_aliquota_valor: rule.cofins_aliquota_valor,
                    cofins_valor: rule.cofins_valor,
                    cofins_quantidade_vendida: rule.cofins_quantidade_vendida,
                    interno_pis_percentual_base_calculo: rule.interno_pis_percentual_base_calculo,
                    interno_pis_quantidade_base_de_calculo: rule.interno_pis_quantidade_base_de_calculo,
                    interno_cofins_percentual_base_calculo: rule.interno_cofins_percentual_base_calculo,
                    interno_cofins_quantidade_base_de_calculo: rule.interno_cofins_quantidade_base_de_calculo,

                    products: { connect: rule.products.map((product) => ({ id: product.id })) },
                })),
            },
        },
        include,
    })

const update = async (id: number, data: NatureForm) => {
    return await prisma.natureza.update({
        where: { id },
        data: {
            finality: data.finality,
            motive: data.motive,
            operation: data.operation,
            type: data.type,
            rules: {
                deleteMany: { natureza_id: id },
                create: data.rules.map((rule) => ({
                    observations: rule.observations,
                    aliquota: rule.aliquota,
                    cfop: rule.cfop,
                    cofins_situacao_tributaria: rule.cofins_situacao_tributaria,
                    destino: rule.destino,
                    icms_modalidade_base_calculo: rule.icms_modalidade_base_calculo,
                    icms_situacao_tributaria: rule.icms_situacao_tributaria,
                    origem: rule.origem,
                    pis_situacao_tributaria: rule.pis_situacao_tributaria,
                    cest: rule.cest,
                    codigo_beneficio_fiscal: rule.codigo_beneficio_fiscal,
                    icms_aliquota_st: rule.icms_aliquota_st,
                    icms_origem: rule.icms_origem,
                    icms_percentual_diferimento: rule.icms_percentual_diferimento,
                    icms_reducao_base_calculo: rule.icms_reducao_base_calculo,
                    icms_valor_desonerado: rule.icms_valor_desonerado,
                    icms_margem_valor_adicionado_st: rule.icms_margem_valor_adicionado_st,
                    pis_base_calculo: rule.pis_base_calculo,
                    pis_aliquota_porcentual: rule.pis_aliquota_porcentual,
                    pis_aliquota_valor: rule.pis_aliquota_valor,
                    pis_valor: rule.pis_valor,
                    pis_quantidade_vendida: rule.pis_quantidade_vendida,
                    cofins_base_calculo: rule.cofins_base_calculo,
                    cofins_aliquota_porcentual: rule.cofins_aliquota_porcentual,
                    cofins_aliquota_valor: rule.cofins_aliquota_valor,
                    cofins_valor: rule.cofins_valor,
                    cofins_quantidade_vendida: rule.cofins_quantidade_vendida,
                    interno_pis_percentual_base_calculo: rule.interno_pis_percentual_base_calculo,
                    interno_pis_quantidade_base_de_calculo: rule.interno_pis_quantidade_base_de_calculo,
                    interno_cofins_percentual_base_calculo: rule.interno_cofins_percentual_base_calculo,
                    interno_cofins_quantidade_base_de_calculo: rule.interno_cofins_quantidade_base_de_calculo,

                    products: { connect: rule.products.map((product) => ({ id: product.id })) },
                })),
            },
        },
        include,
    })
}

const toggle = async (id: number) => {
    const current_value = await prisma.natureza.findUnique({ where: { id }, select: { active: true } })
    return await prisma.natureza.update({ where: { id }, data: { active: !current_value?.active }, include })
}

export default { include, list, create, toggle, update }
