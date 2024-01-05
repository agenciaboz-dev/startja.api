import normalize from "../io/formatting";
import { Customer, DigitalCertificate, PrismaClient } from "@prisma/client";
import { NewUser } from "../definitions/userOperations";
import company from "./company"
import nota from "./nota"

const prisma = new PrismaClient()

const include = { certificate: true, companies: { include: company.include }, notas: { include: nota.include } }

const selections = {
    customer: {
        id: true,
        name: true,
        email: true,
        document: true,
        phone: true,
        certificate: {
            select: {
                expiry: true
            }
        },
        register_date: true
    },
    admin: {
        select: {
            name: true
        }
    }
}

// Função para listar todos os CLIENTES, omitindo informações sensíveis.
const customerList = async () => {
    const customers = await prisma.customer.findMany({
        include
    })
    return customers
}

// Função de criação de novos CLIENTES.
const create = async (data: NewUser) => {
    console.log("Iniciando a criação do usuário...")
    const certificateInput: DigitalCertificate = {
        id: 0,
        certificate: "",
        expiry: ""
    }

    const certificate = await prisma.digitalCertificate.create({
        data: {
            expiry: certificateInput.expiry,
            certificate: certificateInput.certificate
        }
    })

    return await prisma.customer.create({
        data: {
            name: data.name,
            email: normalize(data.email),
            password: data.password,
            phone: data.phone,
            document: normalize(data.document),
            city: data.city,
            state: data.state,
            register_date: new Date().getTime().toString(),
            certificateId: certificate.id,
            district: data.district,
            cep: data.cep,
            adjunct: data.adjunct,
            inscricaoEstadual: data.inscricaoEstadual,
            isento: false,
            number: data.number,
            regimeTributario: data.regimeTributario,
            street: data.street
        },
        include
    })
}

const exists = async (data: NewUser) => {
    return await prisma.customer.findUnique({
        where: {
            email: data.email,
            document: data.document
        },
        include
    })
}

export default { include, selections, customerList, create, exists }
