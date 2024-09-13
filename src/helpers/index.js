export const quantityFormater = (quantity) => {
    return Number(quantity).toLocaleString('es-US', {
        style: "currency",
        currency: "USD"
    })
}