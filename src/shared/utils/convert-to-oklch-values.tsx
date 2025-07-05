import { oklch } from "culori";

export function convertToOklchValues(colorString: string): string {
  // Converte a cor para o formato OKLCH
  const oklchColor = oklch(colorString);

  if (!oklchColor) {
    // Retorna um valor padrão ou lança um erro se a cor for inválida
    console.warn(`Cor inválida fornecida: ${colorString}. Usando um padrão.`);
    return "0.6 0.18 260"; // Retorna o azul padrão como fallback
  }

  // Extrai os valores L (Luminosidade), C (Chroma), e H (Hue)
  const l = oklchColor.l.toFixed(3);
  const c = oklchColor.c.toFixed(3);
  const h = oklchColor.h?.toFixed(3) || 0; // Hue pode ser undefined para cinzas

  // Retorna a string formatada sem a função "oklch()" e parênteses
  return `${l} ${c} ${h}`;
}
