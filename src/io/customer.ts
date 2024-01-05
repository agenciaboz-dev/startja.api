import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler";
import { NewUser } from "../definitions/userOperations";

const list = async (socket: Socket) => {
  try {
    const customer = await databaseHandler.customer.customerList();
    socket.emit("user:list", customer)
  } catch (error) {
    console.error(`Error fetching customer list`);
    socket.emit("user:list:error", { error })
  }
};

const handleSignup = async (socket: Socket, data: NewUser) => {
  try {
    const customer = await databaseHandler.customer.create(data);

    // Emit success event
    socket.emit("user:signup:success", customer);
  } catch (error: any) {
    console.log(error);
    if (error.code === "P2002" && error.meta) {
      // Mapping field errors to error messages
      const fieldErrorMap: any = {
        username: "Username already exists.",
        email: "Email already exists.",
        document: "Document already registered.",
      };
      // Check which field caused the error
      for (const field in fieldErrorMap) {
        if (error.meta.target.includes(field)) {
          socket.emit("user:signup:failed", {
            error: fieldErrorMap[field],
          });
          break;
        }
      }
    }
  }
};

export default { list, handleSignup };
