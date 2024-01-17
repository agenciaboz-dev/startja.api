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
    const property = await databaseHandler.property.create(data)
    const user = await databaseHandler.user.get(property.user_id)
    socket.emit("property:creation:success", property)
    socket.emit("user:update", user)
  } catch (error) {
    console.error(`Error creating property`);
    socket.emit("property:creation:failed", { error });
  }
};

const update = async (socket: Socket, data: NewProperty, id: number) => {
    try {
        const property = await databaseHandler.property.update(data, id)
        const user = await databaseHandler.user.get(property.user_id)
        socket.emit("property:creation:success", property)
        socket.emit("user:update", user)
    } catch (error) {
        console.error(`Error creating property`)
        socket.emit("property:creation:failed", { error })
    }
}

export default { propertyCreate, propertyList, update }
