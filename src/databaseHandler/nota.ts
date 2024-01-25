import { PrismaClient } from "@prisma/client";
import { NewNota } from "../definitions/userOperations";
import nature from "./nature"

const prisma = new PrismaClient();

const include = {
    destinatario: true,
    emitente: true,
    products: { include: { produto: true, tax_rules: true } },
    propriedade: true,
    nature: { include: nature.include }
}

const list = async () => {
    return await prisma.notaFiscal.findMany()
}

const updateStatus = async (id: number, status: string, message?: string) =>
    await prisma.notaFiscal.update({ where: { id }, data: { status, mensagem_sefaz: message || "" }, include })

const authorizedUpdate = async (data: NfeWebhook) =>
    await prisma.notaFiscal.update({
        where: { id: Number(data.ref) },
        data: {
            chave: data.chave_nfe,
            protocolo: data.protocolo,
            url_pdf: data.caminho_danfe,
            url_xml: data.caminho_xml_nota_fiscal
        },
        include
    })

const create = async (data: FocusNFeInvoiceForm, emitente_id: number, destinatario_id: number, propriedade_id: number, nature_id: number) => {
    return await prisma.notaFiscal.create({
        data: {
            destinatario_id,
            emitente_id,
            propriedade_id,
            nature_id,
            consumidor_final: data.consumidor_final,
            finalidade_emissao: data.finalidade_emissao,
            local_destino: data.local_destino,
            natureza_operacao: data.natureza_operacao,
            numero: data.numero,
            presenca_comprador: data.presenca_comprador,
            serie: data.serie,
            tipo_documento: data.tipo_documento,
            valor_frete: data.valor.frete,
            valor_produtos: data.valor.produtos,
            valor_seguro: data.valor.seguro,
            valor_total: data.valor.total,

            emissionDatetime: new Date().getTime().toString(),

            products: {
                create: data.produtos.map((product) => ({
                    productQnty: product.quantidade,
                    unidade: product.unidade_comercial,
                    unitaryValue: Number(product.valor_unitario_comercial),
                    tax_rules: {
                        create: {
                            cfop: product.cfop,
                            destino: data.destinatario.uf,
                            origem: data.emitente.uf,
                            cofins_situacao_tributaria: product.cofins_situacao_tributaria,
                            icms_modalidade_base_calculo: product.icms_modalidade_base_calculo,
                            icms_situacao_tributaria: product.icms_situacao_tributaria,
                            pis_situacao_tributaria: product.pis_situacao_tributaria,
                            aliquota: product.aliquota,
                            cest: product.cest,
                            codigo_beneficio_fiscal: product.codigo_beneficio_fiscal,
                            icms_aliquota_st: product.icms_aliquota_st,
                            icms_origem: product.icms_origem,
                            icms_percentual_diferimento: product.icms_percentual_diferimento,
                            icms_reducao_base_calculo: product.icms_reducao_base_calculo,
                            icms_valor_desonerado: product.icms_valor_desonerado,
                            pis_base_calculo: product.pis_base_calculo,
                            pis_aliquota_porcentual: product.pis_aliquota_porcentual,
                            pis_aliquota_valor: product.pis_aliquota_valor,
                            pis_valor: product.pis_valor,
                            pis_quantidade_vendida: product.pis_quantidade_vendida,
                            cofins_base_calculo: product.cofins_base_calculo,
                            cofins_aliquota_porcentual: product.cofins_aliquota_porcentual,
                            cofins_aliquota_valor: product.cofins_aliquota_valor,
                            cofins_valor: product.cofins_valor,
                            cofins_quantidade_vendida: product.cofins_quantidade_vendida,
                            product_id: Number(product.id),
                            natureza_id: nature_id
                        }
                    },
                    produto: { connect: { id: Number(product.id) } }
                }))
            }
        },
        include
    })
}

export default { include, list, create, updateStatus, authorizedUpdate }
