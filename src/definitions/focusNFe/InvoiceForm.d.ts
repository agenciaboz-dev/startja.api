declare interface FocusNFeInvoiceForm {
    numero: number
    serie: number
    natureza_operacao: string
    tipo_documento: number
    local_destino: number
    finalidade_emissao: number
    consumidor_final: number
    presenca_comprador: number
    informacoes_adicionais_contribuinte: string

    formas_pagamento: {
        indicador_pagamento: number
        forma_pagamento: string
    }

    emitente: {
        cnpj?: string
        cpf?: string
        nome: string
        nome_fantasia: string
        logradouro: string
        numero: number
        bairro: string
        municipio: string
        uf: string
        inscricao_estadual: string
        regime_tributario: number
    }

    destinatario: {
        nome: string
        cnpj?: string
        cpf?: string
        inscricao_estadual: string | null
        telefone: number
        logradouro: string
        numero: number
        bairro: string
        municipio: string
        uf: string
        indicador_inscricao_estadual: number
    }

    valor: {
        frete: number
        seguro: number
        produtos: number
        total: number
    }

    produtos: {
        id: string
        codigo_externo: string
        name: string
        cfop: number
        unidade_comercial: string
        unidade_tributavel: string
        quantidade: number
        valor_unitario_comercial: number
        valor_unitario_tributavel: number
        ncm: string
        icms_origem: number
        icms_situacao_tributaria: string
        cofins_situacao_tributaria: string
        pis_situacao_tributaria: string
        icms_modalidade_base_calculo: number
        informacoes_adicionais_item: string

        aliquota?: number
        cest?: number
        codigo_beneficio_fiscal?: string
        icms_aliquota_st?: number
        icms_reducao_base_calculo?: number
        icms_valor_desonerado?: number
        icms_origem?: number
        icms_percentual_diferimento?: number

        pis_base_calculo: number
        pis_aliquota_porcentual: number
        pis_aliquota_valor: number
        pis_valor: number
        pis_quantidade_vendida: number
        cofins_base_calculo: number
        cofins_aliquota_porcentual: number
        cofins_aliquota_valor: number
        cofins_valor: number
        cofins_quantidade_vendida: number
    }[]
}
