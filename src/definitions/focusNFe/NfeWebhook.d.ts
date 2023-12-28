declare interface NfeWebhook {
    ref: string
    status: string
    cpf_emitente: string
    status_sefaz: string
    mensagem_sefaz: string
    chave_nfe?: string
    numero: string
    serie: string
    protocolo?: string
    caminho_xml_nota_fiscal?: string
    caminho_danfe?: string
    id: string
}
