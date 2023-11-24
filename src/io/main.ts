import { Socket } from "socket.io";
import {
  NewUser,
  LoginForm,
  NewNature,
  NewRule,
  NewCompany,
  NewProduct,
  newProperty,
  NewNota,
} from "../definitions/userOperations";
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

const ruleCreate = async (socket: Socket, data: NewRule) => {
  try {
    const rule = await databaseHandler.rule.create(data);
    socket.emit("rule:creation:success", rule);
  } catch (error) {
    console.error("Error creating rule:", error);
    socket.emit("rule:error", error);
  }
};

const propertyList = async (socket: Socket) => {
  try {
    const properties = await databaseHandler.property.list();
    socket.emit("property:list", properties);
  } catch (error) {
    console.error(`Error fetching nature list`);
    socket.emit("nature:list:error", { error });
  }
};

const propertyCreate = async (socket: Socket, data: newProperty) => {
  try {
    console.log(data);
    const properties = await databaseHandler.property.create(data);
    socket.emit("property:creation:success", properties);
  } catch (error) {
    console.error(`Error creating property`);
    socket.emit("property:creation:failed", { error });
  }
};

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
  natureList,
  natureCreate,
  ruleCreate,
  propertyList,
  propertyCreate,
  notaCreate,
};
