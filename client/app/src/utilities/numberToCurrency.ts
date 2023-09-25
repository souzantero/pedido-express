export const numberToCurrency = (number: number) => {
  return number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}