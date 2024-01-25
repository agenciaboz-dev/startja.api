declare interface FocusNFeInvoiceData {
    numero: number
    serie: number
    natureza_operacao: string
    data_emissao: string
    data_entrada_saida: string
    tipo_documento: number
    local_destino: number
    finalidade_emissao: number
    consumidor_final: number
    presenca_comprador: number
    cnpj_emitente: string | null
    cpf_emitente: string | null | undefined
    nome_emitente: string
    nome_fantasia_emitente: string
    logradouro_emitente: string
    numero_emitente: number
    bairro_emitente: string
    municipio_emitente: string
    uf_emitente: string
    inscricao_estadual_emitente: string
    regime_tributario_emitente: number
    nome_destinatario: string
    cnpj_destinatario: string | null
    cpf_destinatario: string | null | undefined
    inscricao_estadual_destinatario: string | null
    telefone_destinatario: number
    logradouro_destinatario: string
    numero_destinatario: number
    bairro_destinatario: string
    municipio_destinatario: string
    uf_destinatario: string
    indicador_inscricao_estadual_destinatario: number
    valor_frete: number
    valor_seguro: number
    valor_total: number
    valor_produtos: number
    pis_valor: number
    cofins_valor: number
    modalidade_frete: number

    items: {
        numero_item: number
        codigo_produto: string
        descricao: string
        cfop: number
        unidade_comercial: string
        quantidade_comercial: number
        valor_unitario_comercial: number
        valor_unitario_tributavel: number
        unidade_tributavel: string
        codigo_ncm: string
        quantidade_tributavel: number
        valor_bruto: number
        icms_origem: number

        informacoes_adicionais_item: string

        icms_situacao_tributaria: string
        cofins_situacao_tributaria: string
        pis_situacao_tributaria: string
        icms_base_calculo: number
        icms_valor: number
        icms_modalidade_base_calculo: number

        icms_aliquota?: number
        cest?: number
        codigo_beneficio_fiscal?: string
        icms_aliquota_st?: number
        icms_reducao_base_calculo?: number
        icms_valor_desonerado?: number
        icms_origem?: number
        icms_percentual_diferimento?: number
    }[]
}
