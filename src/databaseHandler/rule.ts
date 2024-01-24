import normalize from "../io/formatting";
import { regraTributacao, PrismaClient } from "@prisma/client";
import { TaxRuleForm } from "../definitions/userOperations"

const prisma = new PrismaClient()

// Funções relacionadas as regras de tributação ⬇️
const include = { product: true }

// Função para listar todas as regras de tributação
const list = async () => {
    return await prisma.regraTributacao.findMany({
        include
    })
}

export default { list }
