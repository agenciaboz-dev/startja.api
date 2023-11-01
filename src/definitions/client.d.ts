import { Admin, Customer } from "@prisma/client";
import { Socket } from "socket.io";

declare interface Client {
  socket: Socket;
  user: Admin | Customer;
}

declare interface ClientBag {
  get: (socket: Socket) => Client | undefined;
  find: (id: number) => Client | undefined;
  getUser: (client: Client) => Customer | Admin;
  list: () => Customer[] | Admin[];
  add: (client: Client) => void;
  remove: (client: Client | undefined) => void;
}
