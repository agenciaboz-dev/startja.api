import { PrismaClient } from "@prisma/client";
import { Socket } from "socket.io";

const prisma = new PrismaClient();

// LISTA TODOS OS USURARIOS (ADMINS E CLIENTES)
const list = async (socket: Socket) => {
  const customers = await prisma.customer.findMany();
  const admins = await prisma.admin.findMany();
  socket.emit("user:list", { admins: admins, customers: customers });
};

// TODA A LOGICA DE LOGIN
const login = async (socket: Socket, data: LoginForm) => {
  console.log(data);

  try {
    const user = await prisma.admin.findFirst({
      where: { email: data.email, password: data.password },
    });
    if (user) {
      socket.emit("login:admin", user);
    } else {
      const customer = await prisma.customer.findFirst({
        where: { email: data.email, password: data.password },
      });
      if (customer) {
        socket.emit("login:customer", customer);
      } else {
        socket.emit("login:error", { error: "Usuário ou senha incorretos" });
      }
    }
  } catch (error) {
    console.log(error);
    socket.emit("login:error", error);
  }
};

export default { login, list };
