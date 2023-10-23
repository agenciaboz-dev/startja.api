import {
  Admin,
  Customer,
  DigitalCertificate,
  PrismaClient,
} from "@prisma/client";
import promptObj from "prompt-sync";

const prisma = new PrismaClient();

const prompt = promptObj();

// ESCOLHER ENTRE DELETAR OU CRIAR USUARIO
const chooseFunction = () => {
  const functionType = prompt(
    "Qual é o tipo do função de usuário você quer rodar? (create ou delete): "
  );
  if (functionType == "create") {
    console.log("Iniciado o processo de CRIAÇÃO de USUÁRIO;");
    createUser();
  } else if (functionType == "delete") {
    console.log("Iniciado o processo de DELEÇÃO DE USUÁRIO");
    deleteUser();
  } else {
    console.log(
      'Resposta inválida. Os tipos válidos são "create" ou "delete".'
    );
    chooseFunction();
  }
};

// CRIAR USUARIO
const createUser = () => {
  const userType = prompt(
    "Qual é o tipo do usuário a ser criado? (admin ou cliente): "
  );
  if (userType == "admin") {
    console.log("Criando novo usuário admin;");
    createAdmin();
  } else if (userType == "cliente") {
    console.log("Criando novo usuário cliente;");
    createCustomer();
  } else {
    console.log(
      'Resposta inválida. Os tipos válidos são "admin" ou "cliente".'
    );
    createUser();
  }
};

const createAdmin = async () => {
  const input: Admin = {
    id: 0,
    name: prompt("Digite o nome: "),
    email: prompt("Digite o e-mail: "),
    password: prompt("Digite a senha: "),
  };

  const admin = await prisma.admin.create({
    data: {
      name: input.name,
      email: input.email,
      password: input.password,
    },
  });

  console.log(admin);
};

const createCustomer = async () => {
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

  const input: Customer = {
    id: 0,
    name: prompt("Digite o nome: "),
    email: prompt("Digite o e-mail: "),
    password: prompt("Digite a senha: "),
    phone: prompt("Digite o telefone: "),
    cpf: prompt("Digite o cpf: "),
    city: prompt("Digite a cidade: "),
    state: prompt("Digite o estado: "),
    register_date: new Date().getTime().toString(),

    certificateId: certificate.id,
  };

  const customer = await prisma.customer.create({
    data: {
      name: input.name,
      email: input.email,
      password: input.password,
      phone: input.phone,
      cpf: input.cpf,
      city: input.city,
      state: input.state,
      register_date: input.register_date,

      certificateId: input.certificateId,
    },
    include: { certificate: true, companies: true },
  });

  console.log(customer);
};

// DELETAR USUARIO

// Função para iniciar o processo de exclusão de usuário
const deleteUser = () => {
  // Peça ao usuário para inserir o tipo de usuário a ser excluído (admin ou cliente)
  const userType = prompt(
    "Qual é o tipo do usuário a ser deletado? (admin ou cliente):"
  );

  // Verifique a entrada do usuário e chame a função de exclusão apropriada
  if (userType === "admin") {
    deleteAdmin();
  } else if (userType === "cliente") {
    deleteCustomer();
  } else {
    // Exiba uma mensagem de erro para entrada inválida
    console.log(
      'Resposta inválida. Os tipos válidos são "admin" ou "cliente".'
    );
    // Reinicia a função
    deleteUser();
  }
};

// Função para excluir um usuário admin
const deleteAdmin = async () => {
  // Peça ao usuário o ID do admin a ser excluído
  const id = parseInt(prompt("Qual é a ID do ADMIN para DELEÇÃO?:"));

  // Verifique se o ID analisado é um número válido
  if (id) {
    // Encontre o usuário admin com o ID especificado
    const adminToDelete = await prisma.admin.findUnique({ where: { id } });

    // Verifique se o usuário admin existe
    if (adminToDelete) {
      // Exclua o usuário admin com o ID especificado
      const deletedAdmin = await prisma.admin.delete({
        where: { id: id },
      });

      // Exiba uma mensagem de sucesso
      console.log("ADMIN deletado:", deletedAdmin);
    } else {
      // Exiba uma mensagem de erro para um ID de admin inválido
      console.log(
        "ID Inválido. O ADMIN com essa ID não existe. Tente novamente!"
      );
      // Reinicie a função deleteAdmin para um ID válido
      deleteAdmin();
    }
  } else {
    // Exiba uma mensagem de erro para um formato de ID inválido
    console.log("ID inválido. Por favor, insira uma ID em valor numérico.");
  }
};

// Função para excluir um usuário cliente
const deleteCustomer = async () => {
  // Peça ao usuário o ID do cliente a ser excluído
  const id = parseInt(prompt("Qual é a ID do CLIENTE para DELEÇÃO?:"));

  // Verifique se o ID analisado é um número válido
  if (id) {
    // Encontre o usuário cliente com o ID especificado
    const customerToDelete = await prisma.customer.findUnique({
      where: { id },
    });

    // Verifique se o usuário cliente existe
    if (customerToDelete) {
      // Exclua o usuário cliente com o ID especificado
      const deletedCustomer = await prisma.customer.delete({
        where: { id: id },
      });

      // Exiba uma mensagem de sucesso
      console.log("CLIENTE deletado:", deletedCustomer);
    } else {
      // Exiba uma mensagem de erro para um ID de cliente inválido
      console.log(
        "ID Inválido. O CLIENTE com essa ID não existe. Tente novamente!"
      );
      // Reinicie a função deleteCustomer para um ID válido
      deleteCustomer();
    }
  } else {
    // Exiba uma mensagem de erro para um formato de ID inválido
    console.log("ID inválido. Por favor, insira uma ID em valor numérico.");
  }
};

// Inicie o processo de exclusão de usuário
chooseFunction();
