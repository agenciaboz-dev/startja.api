import forge from "node-forge"

export const getExpiryDate = (buffer: Buffer, password: string) => {
    // Convert Buffer to binary string
    const pfxDer = forge.util.createBuffer(buffer.toString("binary")).getBytes()

    // Convert binary string to asn1
    const asn1 = forge.asn1.fromDer(pfxDer)

    // Decode pfx using forge
    const pfxAsn = forge.pkcs12.pkcs12FromAsn1(asn1, false, password)

    // Extract certificates
    const certBags = pfxAsn.getBags({ bagType: forge.pki.oids.certBag })

    if (certBags[forge.pki.oids.certBag]?.length) {
        const certBag = certBags[forge.pki.oids.certBag]![0]

        // Extract the certificate
        const cert = certBag.cert

        if (cert) {
            // Get the expiry date
            const expiryDate = cert.validity.notAfter

            return expiryDate
        }
    }
}
