import { Socket } from "socket.io";
import { NewNota } from "../definitions/userOperations";
import databaseHandler from "../databaseHandler";

const notaCreate = async (socket: Socket, data: NewNota) => {
  try {
    const nota = await databaseHandler.nota.create(data);
    socket.emit("nota:creation:success", nota);
  } catch (error) {
    console.error(`Error creating nota`, error);
    socket.emit("nota:creation:error", { error });
  }
};

export default {
  notaCreate,
};
