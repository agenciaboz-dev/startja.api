import { Socket } from "socket.io";
import { Server as SocketIoServer } from "socket.io";
import { Server as HttpServer } from "http";
import { Server as HttpsServer } from "https";
import main from "./main";
import user from "./user";
import customer from "./customer";
import product from "./product";
import company from "./company";

let io: SocketIoServer | null = null;

export const initializeIoServer = (server: HttpServer | HttpsServer) => {
  io = new SocketIoServer(server, {
    cors: { origin: "*" },
    maxHttpBufferSize: 1e8,
  });
};

export const getIoInstance = () => {
  if (!io) {
    throw new Error(
      "Socket.IO has not been initialized. Please call initializeIoServer first."
    );
  }
  return io;
};

export const handleSocket = (socket: Socket) => {
  console.log(`new connection: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`disconnected: ${socket.id}`);
  });

  socket.on("user:login", (data) => user.handleLogin(socket, data));
  socket.on("user:list", () => user.list(socket));

  socket.on("product:list", () => product.productList(socket));
  socket.on("product:create", (data) => product.productCreate(socket, data));

  socket.on("customer:list", () => customer.list(socket));
  socket.on("customer:signup", (data) => customer.handleSignup(socket, data));

  socket.on("company:list", () => company.companyList(socket));
  socket.on("company:create", (data) => company.companyCreate(socket, data));

  socket.on("nature:list", () => main.natureList(socket));
  socket.on("nature:create", (data) => main.natureCreate(socket, data));

  socket.on("rule:create", (data) => main.ruleCreate(socket, data));

  socket.on("property:list", () => main.propertyList(socket));
  socket.on("property:create", (data) => main.propertyCreate(socket, data));

  socket.on("nota:create", (data) => main.notaCreate(socket, data));
};
