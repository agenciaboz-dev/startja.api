// NAO FUNCIONA AINDA

// import { Socket } from "socket.io";
// import { PrismaClient } from "@prisma/client"; // Import your Prisma client

// const prisma = new PrismaClient(); // Initialize your Prisma client

// export const login = async (
//   socket: Socket,
//   data: { login: string; password: string }
// ) => {
//   console.log(`Received login request: ${data.login}`);

//   // Your login logic here using Prisma
//   try {
//     const user = await prisma.customer.findFirst({
//       where: {
//         OR: [{ email: data.login }],
//         password: data.password,
//       },
//     });

//     if (user) {
//       socket.emit("login:success", user);
//     } else {
//       socket.emit("login:error", { error: "Login failed" });
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//     socket.emit("login:error", { error: "An error occurred during login" });
//   }
// };
// export default { login };
