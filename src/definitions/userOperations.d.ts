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
    certificateId: string
    regimeTributario: number
    inscricaoEstadual: string
    isento: boolean
}

export declare interface NewCompany {
    type: string
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
  name: string;
  ncm: string;
  icmsOrigin: string;
  rules?: regraTributacao[];
  produtosNota?: ProdutoNotaFiscal[];
}

export declare interface NewNature {
  operation: string;
  type: string;
  finality: string;
  motive: string;
  emissionFinality: string;
  rules: { id: number }[];
}

export declare interface NewRule {
    aliquota: number
    cfop: number
    cofins_situacao_tributaria: string
    icms_modalidade_base_calculo: number
    icms_origem: number
    icms_situacao_tributaria: string
    pis_situacao_tributaria: string

    products: ProdutoNotaFiscal[]
}

export declare interface NewProperty {
    ie: string
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
    series: string
    nota: notaFiscal[]
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
