import { Socket } from "socket.io";
import { NewNota } from "../definitions/userOperations";
import databaseHandler from "../databaseHandler";
import { getIoInstance } from "./socket"

const notaList = async (socket: Socket) => {
  try {
    const nota = await databaseHandler.nota.list();
    socket.emit("nota:list:success", nota);
  } catch (error) {
    console.error("Error retrieving nota list", error);
    socket.emit("nota:list:error");
  }
};

const notaCreate = async (socket: Socket, data: NewNota) => {
  try {
    const nota = await databaseHandler.nota.create(data);
    socket.emit("nota:creation:success", nota);

    const company = await databaseHandler.company.get(nota.companyId)
    if (company) {
        const user = await databaseHandler.user.get(company?.customerId)
        const io = getIoInstance()
        io.emit("user:update", user)
    }

  } catch (error) {
    console.error(`Error creating nota`, error);
    socket.emit("nota:creation:error", { error });
  }
};

export default {
  notaCreate,
  notaList,
};
