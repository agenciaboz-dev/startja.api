import { Socket } from "socket.io";
import { Server as SocketIoServer } from "socket.io";
import { Server as HttpServer } from "http";
import { Server as HttpsServer } from "https";
import user from "./user";
import product from "./product";
import customer from "./customer";
import signup from "./signup";
import { Customer } from "@prisma/client";
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
      console.log(`disconnected: ${socket.id}`)
  })

  socket.on("user:login", (data) => user.login(socket, data));
  socket.on("user:list", (data) => user.list(socket));

  socket.on("product:list", (data) => product.list(socket))
  socket.on("product:create", (data) => product.createProduct(socket, data))

  socket.on("customer:list", (data) => customer.list(socket))
  socket.on("customer:signup", (data) => {
      signup.handleSignup(socket, data)
  })
  
  socket.on("company:list", (data) => company.list(socket));
  socket.on("company:register", (data) => company.register(socket, data));
};
