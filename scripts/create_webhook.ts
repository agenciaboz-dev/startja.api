import focusNFe from "../src/api/focusNFe"

focusNFe.createNfeWebhook({ env: "homologacao", token: "Pj18tLp1c3Gr4wMdi9LQJydzdFSaSeXi" }).then((response) => {
    console.log(response)
})
