import { PrismaClient } from "@prisma/client";
import { Socket } from "socket.io";

const prisma = new PrismaClient();

const login = async (socket: Socket, data: LoginForm) => {
  // toda a lógica de login
    console.log(data)

  try {
    const user = await prisma.admin.findFirst({
      where: { email: data.login, password: data.password },
    });
    if (user) {
      socket.emit("login:admin", user);
    } else {
      const customer = await prisma.customer.findFirst({
        where: { email: data.login, password: data.password },
      });
      if (customer) {
        socket.emit("login:customer", customer);
      } else {
        socket.emit("login:error", { error: "Nenhum User" });
      }
    }
  } catch (error) {
    console.log(error);
    socket.emit("login:error", error);
  }
};

export default { login };
