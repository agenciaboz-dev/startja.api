import focusNFe from "../src/api/focusNFe"

const data = focusNFe.buildInvoice({
    serie: 922,
    natureza_operacao: "quem sabe",
    tipo_documento: 1,
    local_destino: 1,
    finalidade_emissao: 1,
    consumidor_final: 0,
    presenca_comprador: 2,
    emitente: {
        nome: "HENRIQUE DEL COLI BATISTA LIMA",
        inscricao_estadual: "9586480810",
        regime_tributario: 3,
        cpf: "06117933932",
        logradouro: "Rua Canada",
        numero: 185,
        bairro: "Bacacheri",
        municipio: "Curitiba",
        uf: "PR",
        nome_fantasia: "HENRIQUE DEL COLI BATISTA LIMA"
    },
    destinatario: {
        bairro: "centro",
        inscricao_estadual: null,
        indicador_inscricao_estadual: 9,
        logradouro: "rua benjamin constant",
        municipio: "Curitiba",
        nome: "Fernando Burgos",
        numero: 150,
        telefone: 41984556795,
        uf: "PR",
        cpf: "02576698506"
    },
    valor: {
        frete: 0,
        produtos: 25,
        seguro: 0,
        total: 25
    },
    produtos: [
        {
            aliquota: 25,
            cfop: 5102,
            cofins_situacao_tributaria: "01",
            icms_modalidade_base_calculo: 3,
            icms_origem: 0,
            icms_situacao_tributaria: "00",
            id: "1",
            name: "chopp",
            ncm: "12345678",
            pis_situacao_tributaria: "01",
            quantidade: 5,
            unidade_comercial: "un",
            unidade_tributavel: "un",
            valor_unitario_comercial: 5,
            valor_unitario_tributavel: 5
        }
    ]
})

focusNFe.emitInvoice(data, "teste_nota_1")
