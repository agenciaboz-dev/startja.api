import { Socket } from "socket.io";
import { NewNature } from "../definitions/userOperations";
import databaseHandler from "../databaseHandler";

const natureList = async (socket: Socket) => {
  try {
    const natures = await databaseHandler.nature.list();
    socket.emit("nature:list", natures); // manda só a lista
  } catch (error) {
    console.error(`Error fetching nature list`);
    socket.emit("nature:list:error", { error });
  }
};

const natureCreate = async (socket: Socket, data: NewNature) => {
  try {
    const natureza = await databaseHandler.nature.create(data);
    socket.emit("nature:creation:success", natureza);
  } catch (error) {
    console.error("Error creating nature:", error);
    socket.emit("nature:error", error);
  }
};

export default { natureCreate, natureList };
