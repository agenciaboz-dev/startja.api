import { Socket } from "socket.io";
import { NewRule } from "../definitions/userOperations";
import databaseHandler from "../databaseHandler";

const ruleList = async (socket: Socket) => {
  try {
    const rule = await databaseHandler.rule.list();
    socket.emit("rules:list", rule);
  } catch (error) {
    console.error(`Error fetching rules list`);
    socket.emit("rules:list:error", { error });
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

export default { ruleCreate, ruleList };
