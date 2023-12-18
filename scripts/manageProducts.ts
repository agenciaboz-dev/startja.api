import { Product, PrismaClient } from "@prisma/client";
import promptObj from "prompt-sync";

const prisma = new PrismaClient();
const prompt = promptObj();

// ESCOLHER ENTRE DELETAR OU CRIAR UM NOVO PRODUTO
const chooseFunction = () => {
  const functionType = prompt(
    "Para CRIAR um PRODUTO digite CREATE / Para DELETAR um PRODUTO digite DELETE"
  );
  if (functionType == "create") {
    console.log("Iniciado o processo de criação de novo PRODUTO;");
    createProduct();
  } else if (functionType == "delete") {
    console.log("Iniciado o processo de deleção de PRODUTO existente;");
    deleteProduct();
  } else {
    console.log(
      'Resposta inválida. Os tipos válidos são "create" ou "delete".'
    );
    chooseFunction();
  }
};

// CRIAR PRODUTO
const createProduct = async () => {
  const input: Product = {
    id: 0,
    name: prompt("Digite o nome: "),
    ncm: prompt("Digite o NCM do produto: "),
    icmsOrigin: prompt("Digite o ICMS de origem do produto: "),
  };

  const product = await prisma.product.create({
    data: {
      name: input.name,
      ncm: input.ncm,
      icmsOrigin: input.icmsOrigin,
    },
  });

  console.log(product);
};

// DELETAR PRODUTO

// Função para excluir um PRODUTO
const deleteProduct = async () => {
  // Peça ao usuário o ID do admin a ser excluído
  const id = Number(prompt("Qual é a ID do PRODUTO para DELEÇÃO?:"));

  // Verifique se o ID analisado é um número válido
  if (id) {
    // Verifique se o PRODUTO existe
    try {
      // Exclua o PRODUTO com o ID especificado
      const deletedProduct = await prisma.product.delete({
        where: { id: id },
      });
      // Exiba uma mensagem de sucesso
      console.log("PRODUTO deletado:", deletedProduct);
    } catch {
      // Exiba uma mensagem de erro para um ID de PRODUTO inválido
      console.log(
        "ID Inválido. O PRODUTO com essa ID não existe. Tente novamente!"
      );
      // Reinicie a função deleteProduct, se o ID for inválido
      deleteProduct();
    }
  } else {
    // Exiba uma mensagem de erro para um formato de ID inválido
    console.log("ID inválido. Por favor, insira uma ID em valor numérico.");
    // Reinicie a função deleteProduct, se o ID for escrito em formato inválido
    deleteProduct();
  }
};

// Inicia o Processo de CRIAÇÃO ou DELEÇÃO de PRODUTO
chooseFunction();
