import { PrismaClient } from "@prisma/client";
import { Socket } from "socket.io";
import { ClientBag } from "../definitions/client";

const prisma = new PrismaClient();

// LISTA TODOS OS USURARIOS (ADMINS E CLIENTES)
const list = async (socket: Socket) => {
  const customers = await prisma.customer.findMany();
  const admins = await prisma.admin.findMany();
  socket.emit("user:list", { admins: admins, customers: customers });
};

// TODA A LOGICA DE LOGIN
const login = async (socket: Socket, data: LoginForm, client: ClientBag) => {
  console.log(data);

  try {
    const admin = await prisma.admin.findFirst({
      where: { email: data.email, password: data.password },
    });
    if (admin) {
      client.add({ socket, user: admin });
      socket.emit("login:admin", admin);
    } else {
      const customer = await prisma.customer.findFirst({
        where: { email: data.email, password: data.password },
      });
      if (customer) {
        client.add({ socket, user: customer });
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
