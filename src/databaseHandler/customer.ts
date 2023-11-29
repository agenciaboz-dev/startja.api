import { getIoInstance } from "../io/socket";
import normalize from "../io/formatting";
import {
  Admin,
  Customer,
  DigitalCertificate,
  PrismaClient,
} from "@prisma/client";
import {
  NewUser,
  LoginForm,
} from "../definitions/userOperations";

const prisma = new PrismaClient();

const inclusions = {
    customer: { certificate: true, companies: true }
}

const selections = {
    customer: {
        id: true,
        name: true,
        email: true,
        document: true,
        phone: true,
        certificate: {
            select: {
                expiry: true
            }
        },
        register_date: true
    },
    admin: {
        select: {
            name: true
        }
    }
}

// Funções relacionadas aos usuários / clientes e admins ⬇️

const user = {
    // Funções de login para Admins
    loginAdmin: async (data: LoginForm) =>
        await prisma.admin.findFirst({
            where: { OR: [{ email: data.login }], AND: { password: data.password } }
        }),

    // Função de login para clientes
    loginCustomer: async (data: LoginForm) =>
        await prisma.customer.findFirst({
            where: {
                OR: [{ email: data.login }, { document: data.login }],
                AND: { password: data.password }
            },
            include: inclusions.customer
        }),
    // Função para listar todos os dados de todos os usuários. ADMINS e CLIENTES
    list: async () => {
        const admin = await prisma.admin.findMany({})
        const customer = await prisma.customer.findMany({ include: inclusions.customer })
        return { admin, customer }
    },

    // Função para listar todos os CLIENTES, omitindo informações sensíveis.
    customerList: async () => {
        const customers = await prisma.customer.findMany({
            include: inclusions.customer
        })
        return customers
    },

    // Função de criação de novos CLIENTES.
    create: async (data: NewUser) => {
        console.log("Iniciando a criação do usuário...")
        const certificateInput: DigitalCertificate = {
            id: 0,
            certificate: "",
            expiry: ""
        }

        const certificate = await prisma.digitalCertificate.create({
            data: {
                expiry: certificateInput.expiry,
                certificate: certificateInput.certificate
            }
        })

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
                certificateId: certificate.id
            },
            include: inclusions.customer
        })
    },

    exists: async (data: NewUser) => {
        return await prisma.customer.findUnique({
            where: {
                email: data.email,
                document: data.document
            },
            include: inclusions.customer
        })
    }
}

export default { user };
