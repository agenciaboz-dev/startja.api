import {
  Admin,
  Customer,
  DigitalCertificate,
  PrismaClient,
} from "@prisma/client";
import promptObj from "prompt-sync";

const prisma = new PrismaClient();

// CHOOSE WHAT YOU WANT TO SEARCH WITHIN THE DATABASE
const chooseCategory = () => {
  const functionType = prompt(
    "Para gerar lista de usuários digite (users) / Para gerar lista de produtos digite (products) "
  );
  if (functionType == "users") {
    console.log("Gerando lista de usuários: ;");
    findAllUsers();
  } else if (functionType == "products") {
    console.log("Gerando lista de produtos: ;");
    findAllProducts();
  } else {
    console.log(
      'Resposta inválida. Os tipos válidos são "create" ou "delete".'
    );
    chooseCategory();
  }
};

// GIVES A COMPLETE LIST OF ALL REGISTERED USERS
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

// GIVES A COMPLETE LIST OF ALL REGISTERED PRODUCTS
const findAllProducts = async () => {
  try {
    const products = await prisma.product.findMany();
    console.log("Todos os PRODUTOS registrados:");
    console.log(products);
  } catch (error) {
    console.error("Erro ao buscar lista de produtos:", error);
  } finally {
    await prisma.$disconnect(); // Disconnect from the Prisma client
  }
};

chooseCategory();
