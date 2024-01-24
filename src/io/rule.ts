import { Socket } from "socket.io";
import { TaxRuleForm } from "../definitions/userOperations"
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


export default { ruleList }
