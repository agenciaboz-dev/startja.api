import { Admin, Customer, PrismaClient } from "@prisma/client";
import { LoginForm } from "../definitions/userOperations";
import company from "./company";

const prisma = new PrismaClient();

const include = { companies: true, certificate: true }

// Funções relacionadas aos usuários / clientes e admins ⬇️
// Funções de login para Admins

const loginAdmin = async (data: LoginForm) =>
    await prisma.admin.findFirst({
        where: { OR: [{ email: data.email }], AND: { password: data.password } }
    })

// Função de login para clientes
const loginCustomer = async (data: LoginForm) =>
    await prisma.customer.findFirst({
        where: {
            OR: [{ email: data.email }, { document: data.email }],
            AND: { password: data.password }
        },
        include
    })
// Função para listar todos os dados de todos os usuarios. ADMINS e CLIENTES
const list = async () => {
    const admin = await prisma.admin.findMany({})
    const customer = await prisma.customer.findMany({})
    return { admin, customer }
}

const get = async (id: number) =>
    await prisma.customer.findUnique({
        where: { id },
        include
    })

export default { include, loginAdmin, loginCustomer, list, get }
