import {
  Admin,
  Customer,
  DigitalCertificate,
  PrismaClient,
} from "@prisma/client";
import promptObj from "prompt-sync";

const prisma = new PrismaClient();

const findCredentials = async () => {
  try {
    const adminNames = (await prisma.admin.findMany()).flatMap(
      (admin) => admin
    );
    const customerNames = (await prisma.customer.findMany()).flatMap(
      (customer) => customer
    );

    console.log(`CREDENCIAIS DOS ADMINS:\n`);
    adminNames.forEach((admin, index) => {
      console.log(
        `Admin ${index + 1}: \nID: ${admin.id} \nLogin: ${
          admin.email
        } \nPassword: ${admin.password}\n`
      );
    });

    console.log(`CREDENCIAIS DOS CLIENTES:\n`);
    customerNames.forEach((customer, index) => {
      console.log(
        `Customer ${index + 1}: \nID: ${customer.id} \nLogin: ${
          customer.email
        } \nPassword: ${customer.password}\n`
      );
    });
  } catch (error) {
    console.error("Erro ao buscar lista de credenciais dos usuários:", error);
  } finally {
    await prisma.$disconnect(); // Disconnect from the Prisma client
  }
};

findCredentials();
