import { PrismaClient } from "@prisma/client";
import { NewNota } from "../definitions/userOperations";

const prisma = new PrismaClient();

const include = { company: true, products: { include: { produto: true, rule: true } } }

const list = async () => {
    return await prisma.notaFiscal.findMany()
}

const updateStatus = async (id: number, status: string) => await prisma.notaFiscal.update({ where: { id }, data: { status }, include })

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

const create = async (data: FocusNFeInvoiceForm, emitente_id: number) => {
    return await prisma.notaFiscal.create({
        data: {
            consumidor_final: data.consumidor_final,
            destinatario_id: 0,
            emitente_id: emitente_id,
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
            companyId: emitente_id,

            emissionDatetime: new Date().getTime().toString(),

            products: {
                create: data.produtos.map((product) => ({
                    productQnty: product.quantidade,
                    unidade: product.unidade_comercial,
                    unitaryValue: Number(product.valor_unitario_comercial),
                    produto: { connect: { id: Number(product.id) } }
                }))
            }
        },
        include
    })
}

export default { include, list, create, updateStatus, authorizedUpdate }
