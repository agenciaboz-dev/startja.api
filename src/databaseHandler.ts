import { getIoInstance } from "./io/socket";
import normalize from "./io/formatting";
import {
  Admin,
  Customer,
  DigitalCertificate,
  Product,
  Company,
  Natureza,
  regraTributacao,
  PrismaClient,
} from "@prisma/client";
import {
  NewUser,
  NewCompany,
  NewProduct,
  NewNature,
  NewRule,
  newProperty,
  NewNota,
  LoginForm,
} from "./definitions/userOperations";

const prisma = new PrismaClient();

const inclusions = {
  customer: {
    select: {
      name: true,
      email: true,
      document: true,
      phone: true,
      certificate: {
        select: {
          expiry: true,
        },
      },
      register_date: true,
    },
  },
  admin: {
    select: {
      name: true,
    },
  },
};

// Funções relacionadas aos usuários / clientes e admins ⬇️

const user = {
  // Funções de login para Admins
  loginAdmin: async (data: LoginForm) => {
    return await prisma.admin.findFirst({
      where: { email: data.login, password: data.password },
    });
  },
  // Função de login para clientes
  loginCustomer: async (data: LoginForm) => {
    return await prisma.customer.findFirst({
      where: {
        OR: [{ email: data.login }, { document: data.login }],
        AND: { password: data.password },
      },
    });
  },

  // Função para listar todos os dados de todos os usuarios. ADMINS e CLIENTES
  list: async () => {
    const admin = await prisma.admin.findMany({});
    const customer = await prisma.customer.findMany({});
    return { admin, customer };
  },

  // Funcão para listar todos os CLIENTES, omitindo informações sensíveis.
  customerList: async () => {
    const customer = await prisma.customer.findMany({
      select: inclusions.customer.select,
    });
    return customer;
  },

  // Função de criação de novos CLIENTES.
  create: async (data: NewUser) => {
    console.log("Iniciando a criação do usuário...");
    const certificateInput: DigitalCertificate = {
      id: 0,
      certificate: "",
      expiry: "",
    };

    const certificate = await prisma.digitalCertificate.create({
      data: {
        expiry: certificateInput.expiry,
        certificate: certificateInput.certificate,
      },
    });
    return await prisma.customer.create({
      data: {
        name: data.name,
        email: normalize(data.email),
        password: data.password,
        phone: data.phone,
        document: normalize(data.document),
        city: data.city,
        state: data.state,
        register_date: new Date().getTime().toString(),
        companies: {
          create: data.companies,
        },
        certificateId: certificate.id,
      },
      include: { certificate: true, companies: true },
    });
  },
  exists: async (data: NewUser) => {
    return await prisma.customer.findUnique({
      where: {
        email: data.email,
        document: data.document,
      },
    });
  },
};

// Funções relacionadas aos produtos ⬇️

const product = {
  // Função para listar todos os produtos
  list: async () => {
    const product = await prisma.product.findMany({});

    return { product };
  },
  // Função para criar um novo produto
  create: async (data: NewProduct) => {
    return await prisma.product.create({
      data: {
        name: data.name,
        ncm: normalize(data.ncm),
        nota: {},
      },
    });
  },
};

// Funções relacionadas as empresas ⬇️

const company = {
  // Função para listar todas as empresas
  list: async () => {
    const company = await prisma.company.findMany({});
    return { company };
  },
  // Função para criar uma nova empresa
  create: async (data: NewCompany) => {
    return await prisma.company.create({
      data: {
        type: data.type,
        name: data.name,
        document: normalize(data.document),
        iine: normalize(data.iine),
        city: data.city,
        state: data.state,
        district: data.district,
        street: data.street,
        adjunct: data.adjunct,
        number: data.number,
        cep: normalize(data.cep),
        email: normalize(data.email),
        phone: normalize(data.phone),
        customerId: data.customerId,
      },
    });
  },
};

// Funções relacionadas as naturezas ⬇️

const nature = {
  // Função para listar todas as naturezas
  list: async () => {
    const natures = await prisma.natureza.findMany({
      include: { rules: { include: { natures: true } } },
    });

    const rules = await prisma.regraTributacao.findMany({
      include: { natures: true, products: true },
    });
    return { natures, rules };
  },
  // Função para criar uma nova natureza
  create: async (data: NewNature) => {
    const rules = data.rules;
    return await prisma.natureza.create({
      data: {
        operation: data.operation,
        type: data.type,
        finality: data.finality,
        motive: data.motive,
        rules: {
          connect: rules.map((rule: { id: number }) => ({ id: rule.id })),
        },
      },
      include: { rules: true },
    });
  },
};

// Funções relacionadas as regras de tributação ⬇️

const rule = {
  // Função para listar todas as regras de tributação
  list: async () => {
    return await prisma.regraTributacao.findMany({
      include: { natures: true, products: true },
    });
  },
  // funcão para criar uma nova regra de tributação
  create: async (data: NewRule) => {
    const natures = data.natures;
    const products = data.products;

    return await prisma.regraTributacao.create({
      data: {
        uf: data.uf,
        icms: data.icms,
        cfop: data.cfop,
        percentage: data.percentage,
        motive: data.motive,
        rate: data.rate,
        deferral: data.deferral,
        cst: data.cst,
        cofins: data.cofins,
        natures: { connect: natures.map((nature) => ({ id: nature.id })) },
        products: { connect: products.map((product) => ({ id: product.id })) },
      },
    });
  },
};

const property = {
  list: async () => {
    return await prisma.property.findMany();
  },

  create: async (data: newProperty) => {
    return await prisma.property.create({
      data: {
        ie: data.ie,
        nifr: data.nifr,
        cep: normalize(data.cep),
        city: data.city,
        state: data.state,
        street: data.street,
        number: data.number,
        adjunct: data.adjunct,
        district: data.district,
        exploration: data.exploration,
        declarant: data.declarant,
        nota: {},
      },
    });
  },
};

const nota = {
  // list: async () => {
  //   return await prisma.property.findMany();
  // },

  create: async (data: NewNota) => {
    return await prisma.notaFiscal.create({
      data: {
        emission: data.emission,
        seriesNfe: data.seriesNfe,
        clientSupplier: data.clientSupplier,
        issuer: data.issuer,
        value: data.value,
        situation: data.situation,
        dateTime: data.dateTime,
        paymentCondition: data.paymentCondition,
        paymentType: data.paymentType,
        freteType: data.freteType,
        vehiclePlates: data.vehiclePlates,
        vehicleUf: data.vehicleUf,
        shippingCompany: data.shippingCompany,
        productQnty: data.productQnty,
        productType: data.productType,
        bruteWeightKg: data.bruteWeightKg,
        liquidWeightKg: data.liquidWeightKg,
        product: {},
        customer: {},
        property: {},
        nature: {},
      },
    });
  },
};

// Assuming you have a `prisma.nature.create` method, replace it with the correct method name

export default { user, product, company, nature, rule, property, nota };