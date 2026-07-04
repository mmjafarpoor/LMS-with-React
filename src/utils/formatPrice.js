export const formatPricePersian = (price) => {
    if (price === null || price === undefined) return '';
    const numberPrice = Number(price);
    return numberPrice.toLocaleString('en-US');
};