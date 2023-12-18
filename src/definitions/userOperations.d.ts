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
  name: string;
  email: string;
  password: string;
  phone: string;
  document: string;
  city: string;
  state: string;
  district: string;
  street: string;
  adjunct: string;
  number: number;
  cep: string;
  register_date: string;
  certificateId: string;
  businessName: string;
  regimeTributario: number;
  inscricaoEstadual: string;
  isento: boolean;
}

export declare interface NewCompany {
  type: string;
  name: string;
  document: string;
  inscricaoEstadual: string;
  indicadorEstadual: number;
  city: string;
  state: string;
  district: string;
  street: string;
  adjunct: string;
  number: number;
  cep: string;
  email: string;
  phone: number;
  customerId: number;
}

export declare interface NewProduct {
  name: string;
  ncm: string;
  icmsOrigin: string;
  rules?: regraTributacao[];
  nota?: notaFiscal[];
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
  uf: string;
  aliquota: number;
  cfop: number;
  percentageBaseCalculo: number;
  deferralPercentage: string;
  additionalInfo: string;
  icmsOrigin: number;
  fiscalBenefit: string;
  icmsSituation: string;
  pisSituation: string;
  cofinsSituation: string;
  natures: Natureza[];
  products: Product[];
}

export declare interface NewProperty {
  ie: string;
  nifr: string;
  cep: string;
  city: string;
  state: string;
  street: string;
  number: string;
  adjunct: string;
  district: string;
  exploration: string;
  declarant: string;
  series: string;
  nota: notaFiscal[];
}

export declare interface NewNota {
  series: number;
  generalInfo: string;
  paymentCondition: string;
  paymentType: string;
  qtdParcelas: number;
  valorParcelas: number;
  vencimentoParcelas: string;
  freteType: string;
  vehiclePlates: string;
  vehicleUf: string;
  shippingCompany: string;
  transportedProductQuantity: string;
  transportedProductType: string;
  bruteWeightKg: string;
  liquidWeightKg: string;
  totalValue: number;
  totalProductValue: number;
  products: ProdutoNotaFiscal[];
  rules: regraTributacao[];
  company: Company;
  property: Property;
  nature: Natureza;
}

export declare interface NewBankAccount {
  internal: boolean;
  name: string;
  agency: string;
  accNumber: string;
  bankName: string;
}

export declare interface LoginForm {
  email: string;
  password: string;
}

export declare interface ProdutoNotaFiscal {
  unidadeComercial: string;
  unidadeTributavel: string;
  productQnty: number;
  unitaryComercialValue: number;
  unitaryTributableValue: number;
  produtoId: number;
  notaId: number;
}
