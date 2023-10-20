import {
  Admin,
  Customer,
  DigitalCertificate,
  PrismaClient,
} from "@prisma/client";
import promptObj from "prompt-sync";

const prisma = new PrismaClient();

// Gives a complete list of all user information
const findAllUsers = async () => {
  try {
    const customers = await prisma.customer.findMany();
    const admins = await prisma.admin.findMany();
    console.log("Todos os CLIENTES registrados:");
    console.log(customers);
    console.log("Todos os ADMINS regstrados:");
    console.log(admins);
  } catch (error) {
    console.error("Erro ao buscar lista de usuários:", error);
  } finally {
    await prisma.$disconnect(); // Disconnect from the Prisma client
  }
};

findAllUsers();
