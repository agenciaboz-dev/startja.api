import { Customer, PrismaClient, DigitalCertificate } from "@prisma/client";
import { Socket } from "socket.io";

const prisma = new PrismaClient();

// Função para registrar clientes

export const handleSignup = async (socket: Socket, data: Customer) => {
  const certificateInput: DigitalCertificate = {
    id: 0,
    certificate: "",
    expiry: "",
  };

  const certificate = await prisma.digitalCertificate.create({
    data: {
      expiry: certificateInput.expiry,
      certificate: certificateInput.certificate,
    },
  });

  try {
    const user = await prisma.customer.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        cpf: data.cpf,
        city: data.city,
        state: data.state,
        register_date: new Date().getTime().toString(),

        certificateId: certificate.id,
      },
      include: { certificate: true, companies: true },
    });

    console.log(handleSignup);
    if (user) {
      socket.emit("signup:success");
    } else {
      socket.emit("signup:error");
    }
  } catch (error) {
    console.log(error);
    socket.emit("login:error", error);
  }
};

export default { handleSignup };
