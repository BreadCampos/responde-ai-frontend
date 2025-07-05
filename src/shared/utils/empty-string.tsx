/**
 * Verifica um valor e retorna um fallback se ele for nulo, indefinido ou vazio.
 * @param value O valor a ser verificado (string | null | undefined).
 * @param fallback O valor a ser retornado caso o original seja inválido. Padrão é "-".
 * @returns O valor original ou o fallback.
 */
export const emptyValue = (
  value: string | null | undefined,
  fallback: string = "-"
): string => {
  // Se o valor for nulo, indefinido, ou uma string vazia/com espaços, retorna o fallback.
  if (!value || value.trim() === "") {
    return fallback;
  }
  // Caso contrário, retorna o valor original.
  return value;
};
