import {
  Admin,
  Customer,
  DigitalCertificate,
  Product,
  Company,
  Natureza,
  regraTributacao,
  Property,
  notaFiscal,
  Accounts,
} from "@prisma/client";
import { type } from "os";

export declare interface NewUser {
    name: string
    email: string
    password: string
    phone: string
    document: string
    city: string
    state: string
    district: string
    street: string
    adjunct: string
    number: number
    cep: string
    register_date: string
    regimeTributario: number
    inscricaoEstadual: string
    isento: boolean

    businessName: string
    discrimina_impostos: boolean
    enviar_email_destinatario: boolean
    inscricao_municipal: string
    habilita_nfe: boolean
    habilita_nfce: boolean
    proximo_numero_nfe: number
    serie_nfe: number

    certificate: ArrayBuffer
    certificate_password: string
}

export declare interface NewCompany {
    type: string
    final_consumer: boolean
    name: string
    document: string
    inscricaoEstadual: string
    indicadorEstadual: string
    city: string
    state: string
    district: string
    street: string
    adjunct: string
    number: string
    cep: string
    email: string
    phone: string
    customerId: number
    businessName: string
}

export declare interface NewProduct {
    name: string
    ncm: string
    codigo_externo: string
    icmsOrigin: number
    rules?: regraTributacao[]
}

export declare interface NatureForm {
    operation: string
    type: number
    finality: string
    motive: string
    emissionFinality: number

    rules: TaxRuleForm[]
}

export declare interface TaxRuleForm {
    cfop: number
    cofins_situacao_tributaria: string
    icms_modalidade_base_calculo: number
    icms_situacao_tributaria: string
    pis_situacao_tributaria: string

    aliquota?: number
    cest?: number
    codigo_beneficio_fiscal?: string
    icms_aliquota_st?: number
    icms_reducao_base_calculo?: number
    icms_valor_desonerado?: number
    icms_origem?: number
    icms_percentual_diferimento?: number

    product_id: number
    origem: string
    destino: string
}

export declare interface NewProperty {
    ie: string
    name: string
    nifr: string
    cep: string
    city: string
    state: string
    street: string
    number: string
    adjunct: string
    district: string
    exploration: string
    declarant: string
    nfe_series: string
    nfe_number: string
    user_id: number
}

export declare interface NewNota {
    series: number
    generalInfo: string
    paymentCondition: string
    paymentType: string
    qtdParcelas: number
    valorParcelas: number
    vencimentoParcelas: string
    freteType: string
    vehiclePlates: string
    vehicleUf: string
    shippingCompany: string
    transportedProductQuantity: string
    transportedProductType: string
    bruteWeightKg: string
    liquidWeightKg: string
    totalValue: number
    totalProductValue: number
    products: ProdutoNotaFiscal[]
    rules: regraTributacao[]
    company: Company
    property: Property
    nature: Natureza
}

export declare interface NewBankAccount {
    internal: boolean
    name: string
    agency: string
    accNumber: string
    bankName: string
}

export declare interface LoginForm {
    email: string
    password: string
}
