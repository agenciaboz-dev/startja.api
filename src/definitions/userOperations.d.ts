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

export declare interface LoginForm {
  login: string;
  password: string;
}

export declare interface CustomerSignupForm {
  login: string;
  password: string;
}
