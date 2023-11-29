import { Admin, Customer, PrismaClient } from "@prisma/client";
import { LoginForm } from "../definitions/userOperations";

const prisma = new PrismaClient();

const inclusions = {
  customer: { certificate: true, companies: true },
};

// Funções relacionadas aos usuários / clientes e admins ⬇️
const user = {
  // Funções de login para Admins
  loginAdmin: async (data: LoginForm) =>
    await prisma.admin.findFirst({
      where: { OR: [{ email: data.login }], AND: { password: data.password } },
    }),

  // Função de login para clientes
  loginCustomer: async (data: LoginForm) =>
    await prisma.customer.findFirst({
      where: {
        OR: [{ email: data.login }, { document: data.login }],
        AND: { password: data.password },
      },
      include: inclusions.customer,
    }),
  // Função para listar todos os dados de todos os usuários. ADMINS e CLIENTES
  list: async () => {
    const admin = await prisma.admin.findMany({});
    const customer = await prisma.customer.findMany({
      include: inclusions.customer,
    });
    return { admin, customer };
  },
};

export default { user };
