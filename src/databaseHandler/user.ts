import { Admin, Customer, PrismaClient } from "@prisma/client";
import { LoginForm } from "../definitions/userOperations";

const prisma = new PrismaClient();

const inclusions = {
  customer: { certificate: true, companies: true },
};

// Funções relacionadas aos usuários / clientes e admins ⬇️
// Funções de login para Admins
const loginAdmin = async (data: LoginForm) =>
  await prisma.admin.findFirst({
    where: { OR: [{ email: data.login }], AND: { password: data.password } },
  });

// Função de login para clientes
const loginCustomer = async (data: LoginForm) =>
  await prisma.customer.findFirst({
    where: {
      OR: [{ email: data.login }, { document: data.login }],
      AND: { password: data.password },
    },
    include: inclusions.customer,
  });
// Função para listar todos os dados de todos os usuários. ADMINS e CLIENTES
const list = async () => {
  const admin = await prisma.admin.findMany({});
  const customer = await prisma.customer.findMany({
    include: inclusions.customer,
  });
  return { admin, customer };
};

const get = async (id: number) =>
  await prisma.customer.findUnique({
    where: {
      id,
    },
    include: inclusions.customer,
  });

export default { loginAdmin, loginCustomer, list, get };
