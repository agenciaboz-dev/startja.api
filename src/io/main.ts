import { Socket } from "socket.io";
import { NewRule, NewNota } from "../definitions/userOperations";
import databaseHandler from "../databaseHandler";

const ruleCreate = async (socket: Socket, data: NewRule) => {
  try {
    const rule = await databaseHandler.rule.create(data);
    socket.emit("rule:creation:success", rule);
  } catch (error) {
    console.error("Error creating rule:", error);
    socket.emit("rule:error", error);
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
  ruleCreate,

  notaCreate,
};
