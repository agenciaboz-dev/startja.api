import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const enumerateProducts = async () => {
    try {
        const products = await prisma.product.findMany()
        products.map(async (product) => {
            const updated_product = await prisma.product.update({ where: { id: product.id }, data: { codigo_externo: product.id.toString() } })
            console.log(`updated ${updated_product.id} - ${updated_product.name}`)
        })
    } catch (error) {
        console.log(error)
    }
}

enumerateProducts()
