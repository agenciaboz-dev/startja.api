import { Admin, Company, Customer, DigitalCertificate } from "@prisma/client";
import { type } from "os";

export declare interface NewUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  document: string;
  city: string;
  state: string;
  register_date: string;
  companies: Company[];
  certificate: DigitalCertificate;
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
  customerId: number; //Não tenho certeza se é assim que fica esse relacionamento
}

export declare interface NewProduct {
  name: string;
  ncm: string;
  rules: regraTributacao[];
  nota: notaFiscal[];
}

export declare interface NewNature {
  operation: string;
  type: string;
  finality: string;
  motive: string;
  rules: regraTributacao[];
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

export declare interface newProperty {
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
  emission: string;
  seriesNfe: string;
  clientSupplier: string;
  issuer: string;
  value: string;
  situation: boolean;
  dateTime: string;
  paymentCondition: string;
  paymentType: string;
  freteType: string;
  vehiclePlates: string;
  vehicleUf: string;
  shippingCompany: string;
  productQnty: string;
  productType: string;
  bruteWeightKg: string;
  liquidWeightKg: string;
  product: Product[];
  customer: Customer[];
  property: Property[];
  nature: Natureza[];
}

export declare interface LoginForm {
  login: string;
  password: string;
}