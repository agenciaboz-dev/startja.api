declare interface FocusNFeInvoiceForm {
  serie: number;
  natureza_operacao: string;
  tipo_documento: number;
  local_destino: number;
  finalidade_emissao: number;
  consumidor_final: number;
  presenca_comprador: number;
  emitente: {
    cnpj?: string;
    cpf?: string;
    nome: string;
    nome_fantasia: string;
    logradouro: string;
    numero: number;
    bairro: string;
    municipio: string;
    uf: string;
    inscricao_estadual: string;
    regime_tributario: number;
  };

  destinatario: {
    nome: string;
    cnpj?: string;
    cpf?: string;
    inscricao_estadual: string | null;
    telefone: number;
    logradouro: string;
    numero: number;
    bairro: string;
    municipio: string;
    uf: string;
    indicador_inscricao_estadual: number;
  };

  valor: {
    frete: number;
    seguro: number;
    produtos: number;
    total: number;
  };

  produtos: {
    id: string;
    name: string;
    cfop: number;
    unidade_comercial: string;
    unidade_tributavel: string;
    quantidade: number;
    valor_unitario_comercial: number;
    valor_unitario_tributavel: number;
    ncm: string;
    icms_origem: number;
    icms_situacao_tributaria: string;
    cofins_situacao_tributaria: string;
    pis_situacao_tributaria: string;
    aliquota: number;
    icms_modalidade_base_calculo: number;
  }[];
}
