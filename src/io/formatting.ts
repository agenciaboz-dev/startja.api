// FUNÇÃO DE VALIDAÇÃO #1
// Função que checka a válidade do CPF, e formata caso seja um número válido
export function formatCPF(cpf: string | null): string {
  if (cpf === null) {
    throw new Error("CPF is null");
  }
  if (cpf.length !== 11) {
    throw new Error("CPF INVÁLIDO");
  }
  // Lógica de formatação
  return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(
    9
  )}`;
}

// FUNÇÃO DE VALIDAÇÃO #2
// Função que checka a válidade do Telefone, e formata caso seja um número válido
export function formatPhone(telefone: string | null): string {
  if (telefone === null) {
    throw new Error("Telefone is null");
  }

  if (telefone.length === 11) {
    // Format the phone number if it has 11 characters (41) 9 9999-9999
    const formattedTelefone = `(${telefone.slice(0, 2)}) ${telefone.slice(
      2,
      3
    )} ${telefone.slice(3, 7)}-${telefone.slice(7)}`;
    return formattedTelefone;
  } else {
    throw new Error("TELEFONE INVÁLIDO");
  }
}

// FUNÇÃO DE VALIDAÇÃO #3
// Função que checka a válidade do NCM, e formata caso seja um número válido
// export function validateNCM(ncm: string): string | null {
//   // Limpa o código de pontuação desnecesária
//   const cleanedNCM = ncm.replace(/[^0-9]/g, "");

//   // Formata o código NCM limpo na seguinte estrutura de código: 0000.00.00
//   if (cleanedNCM.length === 8) {
//     return `${cleanedNCM.substr(0, 4)}.${cleanedNCM.substr(
//       4,
//       2
//     )}.${cleanedNCM.substr(6, 2)}`;
//   }
//   return null;
// }
