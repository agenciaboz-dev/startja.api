import normalize from "../io/formatting";
import { Customer, DigitalCertificate, PrismaClient } from "@prisma/client";
import { NewUser } from "../definitions/userOperations";
import company from "./company"
import nota from "./nota"
import { getExpiryDate } from "../tools/certificate_expiry"

const prisma = new PrismaClient()

const include = { certificate: true, companies: { include: company.include }, notas: { include: nota.include }, properties: true }

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

    console.log(data)
    const buffer = Buffer.from(data.certificate)
    const certificate_base64 = buffer.toString("base64")
    const expiryDate = getExpiryDate(buffer, data.certificate_password)

    const certificateInput: DigitalCertificate = {
        id: 0,
        certificate: certificate_base64,
        expiry: expiryDate?.getTime().toString() || "",
        password: data.certificate_password
    }

    const certificate = await prisma.digitalCertificate.create({
        data: {
            expiry: certificateInput.expiry,
            certificate: certificateInput.certificate,
            password: certificateInput.password
        }
    })

    return await prisma.customer.create({
        data: {
            name: data.name,
            email: data.email.toLowerCase(),
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
            street: data.street,

            businessName: data.businessName,
            discrimina_impostos: data.discrimina_impostos,
            enviar_email_destinatario: data.enviar_email_destinatario,
            habilita_nfce: data.habilita_nfce,
            habilita_nfe: data.habilita_nfe,
            inscricao_municipal: data.inscricao_municipal,
            proximo_numero_nfe: data.proximo_numero_nfe,
            serie_nfe: data.serie_nfe
        },
        include
    })
}

const updateTokens = async (id: number, data: { token: string; token_sandbox: string }) =>
    await prisma.customer.update({ where: { id }, data: { token: data.token, token_sandbox: data.token_sandbox }, include })

const exists = async (data: NewUser) => {
    return await prisma.customer.findUnique({
        where: {
            email: data.email,
            document: data.document
        },
        include
    })
}

export default { include, selections, customerList, create, exists, updateTokens }
