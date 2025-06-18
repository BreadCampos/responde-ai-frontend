export function formatCurrency(cents: number): string {
  const value = cents / 100;
  return value.toLocaleString("BRL", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function parseCurrencyToCents(value: string): number {
  const numericValue = parseFloat(value.replace(/\./g, "").replace(",", "."));

  return Math.round(numericValue * 100);
}
