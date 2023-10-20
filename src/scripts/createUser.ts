import { Admin, Customer, DigitalCertificate, PrismaClient } from "@prisma/client";
import promptObj from "prompt-sync"

const prisma = new PrismaClient()

const prompt = promptObj()

const createUser = () => {
    const userType = prompt('Qual é o tipo do usuário a ser criado? (admin ou cliente) ')
    if(userType == 'admin'){
        console.log('Criando novo usuário admin;')
        createAdmin()
    } else if(userType == 'cliente') {
        console.log('Criando novo usuário cliente;')
        createCustomer()
    } else {
        console.log('Resposta inválida. Os tipos válidos são "admin" ou "cliente".')
        createUser()
    }
}

const createAdmin = async () => {
    const input:Admin = {
        id: 0,
        name: prompt('Digite o nome: '),
        email: prompt('Digite o e-mail: '),
        password: prompt('Digite a senha: ')
    }

    const admin = await prisma.admin.create({data:
        {
            name: input.name,
            email: input.email,
            password: input.password,
        }
    })

    console.log(admin)
}

const createCustomer = async () => {
    const certificateInput:DigitalCertificate = {
        id: 0,
        certificate: "",
        expiry: ""
    }

    const certificate = await prisma.digitalCertificate.create({
        data: {
            expiry: certificateInput.expiry,
            certificate: certificateInput.certificate,
        }
    })

    const input:Customer = {
        id: 0,
        name: prompt('Digite o nome: '),
        email: prompt('Digite o e-mail: '),
        password: prompt('Digite a senha: '),
        phone: prompt('Digite o telefone: '),
        cpf: prompt('Digite o cpf: '),
        city: prompt('Digite a cidade: '),
        state: prompt('Digite o estado: '),
        register_date: new Date().getTime().toString(),

        certificateId: certificate.id
    }

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
        include: {certificate: true, companies: true}
    })

    console.log(customer)
}

createUser()