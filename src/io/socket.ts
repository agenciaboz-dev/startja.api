import { Socket } from "socket.io";
import { Server as SocketIoServer } from "socket.io";
import { Server as HttpServer } from "http";
import { Server as HttpsServer } from "https";
import { Customer } from "@prisma/client";
import { Client, ClientBag } from "../definitions/client";
import user from "./user";
import product from "./product";
import customer from "./customer";
import signup from "./signup";
import { logout } from "./logout";

import company from "./company";

let io: SocketIoServer | null = null;

export let clientList: Client[] = [];

const get = (socket: Socket) =>
  clientList.find((client) => client.socket == socket);
const find = (id: number) => clientList.find((client) => client.user?.id == id);
const getUser = (client: Client) => client.user;
const list = () => clientList.map((client) => client.user);

const remove = (client: Client | undefined) => {
  if (!client) return;
  clientList = clientList.filter((item) => item.socket != client.socket);
};

const add = (client: Client) => {
  const exists = find(client.user?.id);
  if (exists) remove(client);

  clientList.push(client);
};

const clients: ClientBag = {
  get,
  find,
  getUser,
  list,
  add,
  remove,
};

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

  socket.on("user:login", (data) => user.login(socket, data, clients));
  socket.on("user:list", (data) => user.list(socket));
  socket.on("product:list", (data) => product.list(socket));
  socket.on("product:create", (data) => product.createProduct(socket, data));
  socket.on("customer:list", (data) => customer.list(socket));
  socket.on("customer:signup", (data) => {
    signup.handleSignup(socket, data);
  });
  socket.on("company:list", (data) => company.list(socket));
  socket.on("company:create", (data) => company.create(socket, data));
  socket.on("user:logout", () => {
    logout(socket, clients);
  });
};
