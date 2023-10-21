// NAO FUNCIONA....

// const io = require("socket.io-client");

// const socket = io("https://app.agenciaboz.com.br:4109"); // Replace with your server URL

// socket.on("connect", () => {
//   console.log("Connected to the server");

//   // Define your login data
//   const loginData = {
//     login: "user@example.com", // Replace with a valid email
//     password: "password123", // Replace with a valid password
//   };

//   // Emit a "user:login" event with login data
//   socket.emit("user:login", loginData);
// });

// socket.on("login:success", (user: string) => {
//   console.log("Login successful:", user);
//   socket.disconnect();
// });

// socket.on("login:error", (error: Error) => {
//   console.error("Login error:", error);
//   socket.disconnect();
// });

// socket.on("connect_error", (error: Error) => {
//   console.error("Socket.io connection error:", error);
//   // Handle the error appropriately
// });
