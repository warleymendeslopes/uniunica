export async function validatePartner(partnerId: string): Promise<boolean> {
    // MOCK: Substitua com consulta ao banco depois
    const validPartners = ['1026', '2001', '3000']
    return validPartners.includes(partnerId)
}