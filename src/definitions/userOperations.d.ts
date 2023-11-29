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
}

export declare interface NewCompany {
  type: string;
  name: string;
  document: string;
  iine: string;
  city: string;
  state: string;
  district: string;
  street: string;
  adjunct: string;
  number: string;
  cep: string;
  email: string;
  phone: string;
  customerId: number;
}

export declare interface NewProduct {
  name: string;
  ncm: string;
  rules?: regraTributacao[];
  nota?: notaFiscal[];
}

export declare interface NewNature {
  operation: string;
  type: string;
  finality: string;
  motive: string;
  rules: { id: number }[];
}

export declare interface NewRule {
  uf: string;
  icms: string;
  cfop: string;
  percentage: string;
  motive: string;
  rate: string;
  deferral: string;
  cst: string;
  cofins: string;
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
  nota: notaFiscal[];
}

export declare interface NewNota {
    series: string
    nfe: string
    clientSupplier: string
    issuer: string
    value: string
    situation: string
    dateTime: string
    paymentCondition: string
    paymentType: string
    freteType: string
    vehiclePlates: string
    vehicleUf: string
    shippingCompany: string
    productQnty: string
    productType: string
    bruteWeightKg: string
    liquidWeightKg: string
    products: Product[]
    company: Company
    property: Property
    nature: Natureza
}

export declare interface LoginForm {
  login: string;
  password: string;
}
