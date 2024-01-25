import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler";
import { NewUser } from "../definitions/userOperations";
import focusNFe from "../api/focusNFe"
import { AxiosError } from "axios"

const list = async (socket: Socket) => {
    try {
        const customer = await databaseHandler.customer.customerList()
        socket.emit("user:list", customer)
    } catch (error) {
        console.error(`Error fetching customer list`)
        socket.emit("user:list:error", { error })
    }
}

const handleSignup = async (socket: Socket, data: NewUser) => {
    try {
        const customer = await databaseHandler.customer.create(data)

        const is_cpf = customer.document.length == 11

        const focusSignup = await focusNFe.signCustomer({
            arquivo_certificado_base64: customer.certificate.certificate,
            bairro: customer.district,
            cep: Number(customer.cep.replace(/\D/g, "")),
            cnpj: is_cpf ? "" : customer.document,
            cpf: is_cpf ? customer.document : "",
            complemento: customer.adjunct,
            discrimina_impostos: customer.discrimina_impostos,
            email: customer.email,
            enviar_email_destinatario: customer.enviar_email_destinatario,
            enviar_email_homologacao: customer.enviar_email_destinatario,
            habilita_nfce: customer.habilita_nfce,
            habilita_nfe: customer.habilita_nfe,
            inscricao_estadual: Number(customer.inscricaoEstadual),
            inscricao_municipal: Number(customer.inscricao_municipal),
            logradouro: customer.street,
            municipio: customer.city,
            nome: customer.name,
            nome_fantasia: customer.businessName,
            numero: customer.number,
            proximo_numero_nfe_homologacao: customer.proximo_numero_nfe,
            proximo_numero_nfe_producao: customer.proximo_numero_nfe,
            regime_tributario: customer.regimeTributario,
            senha_certificado: customer.certificate.password,
            serie_nfe_homologacao: customer.serie_nfe,
            serie_nfe_producao: customer.serie_nfe,
            telefone: customer.phone,
            uf: customer.state
        })

        console.log(focusSignup)
        const updated_user = await databaseHandler.customer.updateTokens(customer.id, focusSignup)

        // Emit success event
        socket.emit("user:signup:success", updated_user)
    } catch (error: any) {
        console.log(error)

        if (error instanceof AxiosError) {
            console.log(error.response?.data)
            socket.emit("user:signup:failed", error.response?.data)
        }

        if (error.code === "P2002" && error.meta) {
            // Mapping field errors to error messages
            const fieldErrorMap: any = {
                email: "e-mail já cadastrado.",
                document: "documento já cadastrado."
            }
            // Check which field caused the error
            for (const field in fieldErrorMap) {
                if (error.meta.target.includes(field)) {
                    socket.emit("user:signup:failed", {
                        error: fieldErrorMap[field]
                    })
                    break
                }
            }
        }
    }
}

export default { list, handleSignup };
