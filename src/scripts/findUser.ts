import {
  Admin,
  Customer,
  DigitalCertificate,
  PrismaClient,
} from "@prisma/client";
import promptObj from "prompt-sync";

const prisma = new PrismaClient();

const findAllUsers = async () => {
  try {
    const customers = await prisma.customer.findMany();
    const admins = await prisma.admin.findMany();
    console.log("All Users:");
    // console.log(customers);
    // console.log(admins);
  } catch (error) {
    console.error("Error while fetching users:", error);
  } finally {
    await prisma.$disconnect(); // Disconnect from the Prisma client
  }
};

findAllUsers()
  .catch((error) => {
    console.error("Error in findAllUsers:", error);
  })
  .finally(() => {
    process.exit(0); // Exit the script
  });
