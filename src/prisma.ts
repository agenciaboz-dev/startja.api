import { PrismaClient, Customer, Product } from "@prisma/client";

const prisma = new PrismaClient();

export const fetch = {
  user: {
    login: async (data: { login: string; password: string }) => {
      const customer = await prisma.customer.findFirst({
        where: {
          OR: [{ email: data.login }],
          AND: { password: data.password },
        },
      });

      return customer;
    },
    get: async (id: number) =>
      await prisma.customer.findUnique({ where: { id } }),
    update: async (data: Customer) =>
      await prisma.customer.update({
        where: { id: data.id },
        data: {
          city: data.city,
          state: data.state,
          email: data.email,
          name: data.name,
          phone: data.phone?.replace(/\D/g, ""),
        },
      }),
  },

  products: {
    id: (id: string | number, callback: (products: Product | null) => void) =>
      prisma.product
        .findUnique({ where: { id: Number(id) } })
        .then((result) => callback(result)),
  },
};
