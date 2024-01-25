declare interface FocusWebhookData {
    event: "nfe" | "nfse" | "nfce_contingencia" | "nfce_correcao_timeout" | "nfe_recebida" | "nfse_recebida" | "inutilizacao" | "cte" | "mdfe"
    url: string
}
