import { Socket } from "socket.io";
import { NewRule } from "../definitions/userOperations";
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

export default { ruleCreate };
