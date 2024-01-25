declare interface FocusNFECustomerData {
    nome: string
    nome_fantasia: string
    bairro: string
    cep: number
    cnpj: string
    cpf: string
    complemento: string
    discrimina_impostos: boolean
    email: string
    enviar_email_destinatario: boolean
    enviar_email_homologacao: boolean
    inscricao_estadual: number
    inscricao_municipal: number
    logradouro: string
    numero: number
    regime_tributario: number
    telefone: string
    municipio: string
    uf: string
    habilita_nfe: boolean
    habilita_nfce: boolean
    arquivo_certificado_base64: string
    senha_certificado: string

    proximo_numero_nfe_producao: number
    proximo_numero_nfe_homologacao: number
    serie_nfe_producao: number
    serie_nfe_homologacao: number
}
