import { Socket } from "socket.io";
import { NewCompany } from "../definitions/userOperations";
import databaseHandler from "../databaseHandler";

const companyList = async (socket: Socket) => {
  try {
    const company = await databaseHandler.company.list();
    socket.emit("company:list", company);
  } catch (error) {
    console.error(`Error fetching company list`);
    socket.emit("company:list:error", { error });
  }
};

const companyCreate = async (socket: Socket, data: NewCompany) => {
  try {
    const company = await databaseHandler.company.create(data);
    socket.emit("company:creation:success", company);
    socket.broadcast.emit("company:new", company);
  } catch (error) {
    console.error(`Error creating company`, error);
    socket.emit("company:creation:error", { error });
  }
};

export default { companyCreate, companyList };
