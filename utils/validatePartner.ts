export async function validatePartner(partnerId: string): Promise<boolean> {
    const validPartners = ['1026', '2423', '3000']
    return validPartners.includes(partnerId)
}