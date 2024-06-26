import axios, { AxiosError } from "axios"

const signCustomer = async (data: FocusNFECustomerData) => {
    const response = await axios.post("https://api.focusnfe.com.br/v2/empresas", data, {
        auth: { username: "Jb5xcx5U8TDbgB9T8CxqqeGtfcemCWVI", password: "" },
    })

    return response.data
}

const createNfeWebhook = async (env: FocusEnviroment) => {
    const data: FocusWebhookData = { event: "nfe", url: "https://agencyboz.com:4109/api/nfefocus/nfe/webhook" }
    const response = await axios.post(`https://${env.env}.focusnfe.com.br/v2/hooks`, data, {
        auth: { username: env.token, password: "" },
    })

    return response.data
}

const emitInvoice = async (data: FocusNFeInvoiceData, reference: string, env: FocusEnviroment) => {
    console.log(data)
    try {
        const response = await axios.post(`https://${env.env}.focusnfe.com.br/v2/nfe?ref=${reference}`, data, {
            auth: { username: env.token, password: "" },
        })

        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response?.data)
        }
    }
}

const consultInvoice = async (reference: string, env: FocusEnviroment) => {
    const response = await axios.get(`https://${env.env}.focusnfe.com.br/v2/nfe/${reference}?completa=0`, {
        auth: { username: env.token, password: "" },
    })
    console.log(response.data)
}

const buildInvoice = (data: FocusNFeInvoiceForm) => {
    const new_data: FocusNFeInvoiceData = {
        // token,

        numero: data.numero,
        serie: data.serie,
        natureza_operacao: data.natureza_operacao,
        data_emissao: new Date().toISOString().split("T")[0],
        data_entrada_saida: new Date().toISOString().split("T")[0],
        tipo_documento: data.tipo_documento,
        local_destino: data.local_destino,
        finalidade_emissao: data.finalidade_emissao,
        consumidor_final: data.destinatario.indicador_inscricao_estadual == 9 ? 1 : data.consumidor_final,
        presenca_comprador: data.presenca_comprador,
        cnpj_emitente: !!data.emitente.cnpj ? data.emitente.cnpj : null,
        cpf_emitente: !data.emitente.cnpj ? data.emitente.cpf : null,
        nome_emitente: data.emitente.nome,
        nome_fantasia_emitente: data.emitente.nome_fantasia,
        logradouro_emitente: data.emitente.logradouro,
        numero_emitente: data.emitente.numero,
        bairro_emitente: data.emitente.bairro,
        municipio_emitente: data.emitente.municipio,
        uf_emitente: data.emitente.uf,
        // cep_emitente: data.emitente.bairro,
        inscricao_estadual_emitente: data.emitente.inscricao_estadual,
        regime_tributario_emitente: data.emitente.regime_tributario,

        nome_destinatario: data.destinatario.nome,
        cnpj_destinatario: !!data.destinatario.cnpj ? data.destinatario.cnpj : null,
        cpf_destinatario: !data.destinatario.cnpj ? data.destinatario.cpf : null,
        inscricao_estadual_destinatario: data.destinatario.inscricao_estadual,
        telefone_destinatario: data.destinatario.telefone,
        logradouro_destinatario: data.destinatario.logradouro,
        numero_destinatario: data.destinatario.numero,
        bairro_destinatario: data.destinatario.bairro,
        municipio_destinatario: data.destinatario.municipio,
        uf_destinatario: data.destinatario.uf,
        indicador_inscricao_estadual_destinatario: data.destinatario.indicador_inscricao_estadual,
        // cep_destinatario: order.address?.cep || "02304-000",

        valor_frete: data.transporte.valor_frete,
        valor_seguro: data.transporte.valor_seguro,
        valor_total: data.valor.total,
        valor_produtos: data.valor.produtos,
        pis_valor: data.valor.produtos * (0.65 / 100),
        cofins_valor: data.valor.produtos * (3 / 100),
        modalidade_frete: 0,
        informacoes_adicionais_contribuinte: data.informacoes_adicionais_contribuinte,

        items: data.produtos.map((item, index) => ({
            numero_item: index + 1,
            codigo_produto: item.codigo_externo,
            descricao: item.name,
            cfop: item.cfop,
            unidade_comercial: item.unidade_comercial,
            quantidade_comercial: item.quantidade,
            valor_unitario_comercial: item.valor_unitario_comercial,
            valor_unitario_tributavel: item.valor_unitario_tributavel,
            unidade_tributavel: item.unidade_tributavel,
            codigo_ncm: item.ncm.replace(/\D/g, ""),
            quantidade_tributavel: item.quantidade,
            valor_bruto: item.valor_unitario_comercial * item.quantidade,
            icms_origem: item.icms_origem,
            informacoes_adicionais_item: item.informacoes_adicionais_item,
            icms_situacao_tributaria: item.icms_situacao_tributaria,
            cofins_situacao_tributaria: item.cofins_situacao_tributaria,
            pis_situacao_tributaria: item.pis_situacao_tributaria,
            icms_base_calculo: item.valor_unitario_comercial * item.quantidade,
            icms_aliquota: item.aliquota,
            icms_valor: item.valor_unitario_comercial * item.quantidade * ((item.aliquota || 100) / 100),
            icms_modalidade_base_calculo: item.icms_modalidade_base_calculo,
            cest: item.cest || undefined,
            codigo_beneficio_fiscal: item.codigo_beneficio_fiscal,
            icms_aliquota_st: item.icms_aliquota_st,
            icms_percentual_diferimento: item.icms_percentual_diferimento,
            icms_reducao_base_calculo: item.icms_reducao_base_calculo,
            icms_valor_desonerado: item.icms_valor_desonerado,
        })),
    }

    console.log(new_data)
    return new_data
}

export default { emitInvoice, buildInvoice, consultInvoice, signCustomer, createNfeWebhook }
