// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function deepCompare(obj1: any, obj2: any): boolean {
  // 1. Verificação de igualdade estrita (cobre primitivos e mesma referência de objeto)
  if (obj1 === obj2) {
    return true;
  }

  // 2. Verifica se ambos são objetos e não nulos
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  // 3. Compara as chaves dos objetos
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  // 4. Compara os valores de cada chave recursivamente
  for (const key of keys1) {
    // Se a chave não existe no segundo objeto ou os valores são diferentes
    if (!keys2.includes(key) || !deepCompare(obj1[key], obj2[key])) {
      return false;
    }
  }

  // 5. Se todas as chaves e valores forem iguais, os objetos são equivalentes
  return true;
}
