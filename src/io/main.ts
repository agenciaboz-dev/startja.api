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
import { ClientBag } from "../definitions/client";
import databaseHandler from "../databaseHandler";

const prisma = databaseHandler;

const handleLogin = async (socket: Socket, data: LoginForm) => {
  const admin = await databaseHandler.user.loginAdmin(data);
  const customer = await databaseHandler.user.loginCustomer(data);

  if (admin) {
    socket.emit("admin:login:success", admin);
  } else if (customer) {
    socket.emit("customer:login:success", customer);
  } else {
    socket.emit("user:login:failed", { error: "Credenciais inválidas." });
  }
};

const handleSignup = async (
  socket: Socket,
  data: NewUser // Change 'any' to 'NewUser' to ensure type safety
) => {
  try {
    databaseHandler.user.create(data);
    // Emit success event
    socket.emit("user:signup:success", data);
  } catch (error: any) {
    console.log(error);
    if (error.code === "P2002" && error.meta) {
      // Mapping field errors to error messages
      const fieldErrorMap: any = {
        username: "Username already exists.",
        email: "Email already exists.",
        cpf: "CPF already registered.",
        rg: "RG already registered.",
        cnpj: "CNPJ already registered.",
        voter_card: "Voter card already registered.",
        work_card: "Work card already exists.",
      };
      // Check which field caused the error
      for (const field in fieldErrorMap) {
        if (error.meta.target.includes(field)) {
          socket.emit("application:status:failed", {
            error: fieldErrorMap[field],
          });
          break;
        }
      }
    }
  }
};

const userList = async (socket: Socket) => {
  try {
    const { admin, customer } = await databaseHandler.user.list();
    socket.emit("user:list", { admin, customer });
  } catch (error) {
    console.error(`Error fetching user list`);
    socket.emit("user:list:error", { error });
  }
};

const customerList = async (socket: Socket) => {
  try {
    const customer = await databaseHandler.user.customerList();
    socket.emit("customer:list", customer);
  } catch (error) {
    console.error(`Error fetching customer list`);
    socket.emit("customer:list:error", { error });
  }
};

const productList = async (socket: Socket) => {
  try {
    const product = await databaseHandler.product.list();
    socket.emit("product:list", product);
  } catch (error) {
    console.error(`Error fetching product list`);
    socket.emit("product:list:error", { error });
  }
};

const productCreate = async (socket: Socket, data: NewProduct) => {
  try {
    const product = await databaseHandler.product.create(data);
    socket.emit("product:creation:successful", product);
  } catch (error) {
    console.error(`Error creating product`);
    socket.emit("product:creation:error", { error });
  }
};

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
  } catch (error) {
    console.error(`Error creating company`, error);
    socket.emit("company:creation:error", { error });
  }
};

const natureList = async (socket: Socket) => {
  try {
    const natures = await databaseHandler.nature.list();
    socket.emit("nature:list", natures);
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
    const natureza = await databaseHandler.rule.create(data);
    socket.emit("rule:creation:success", natureza);
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
    const properties = await databaseHandler.property.create(data);
    socket.emit("property:creation:success", properties);
  } catch (error) {
    console.error(`Error fetching nature list`);
    socket.emit("nature:list:error", { error });
  }
};

const notaCreate = async (socket: Socket, data: NewNota) => {
  try {
    const properties = await databaseHandler.nota.create(data);
    socket.emit("property:creation:success", properties);
  } catch (error) {
    console.error(`Error fetching nature list`);
    socket.emit("nature:list:error", { error });
  }
};

export default {
  handleLogin,
  handleSignup,
  userList,
  customerList,
  productList,
  productCreate,
  companyList,
  companyCreate,
  natureList,
  natureCreate,
  ruleCreate,
  propertyList,
  propertyCreate,
  notaCreate,
};
