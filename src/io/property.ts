import { Socket } from "socket.io";
import { NewProperty } from "../definitions/userOperations";
import databaseHandler from "../databaseHandler";

const propertyList = async (socket: Socket) => {
  try {
    const properties = await databaseHandler.property.list();
    socket.emit("property:list", properties);
  } catch (error) {
    console.error(`Error fetching nature list`);
    socket.emit("nature:list:error", { error });
  }
};

const propertyCreate = async (socket: Socket, data: NewProperty) => {
  try {
    console.log(data);
    const properties = await databaseHandler.property.create(data);
    socket.emit("property:creation:success", properties);
  } catch (error) {
    console.error(`Error creating property`);
    socket.emit("property:creation:failed", { error });
  }
};

export default { propertyCreate, propertyList };
