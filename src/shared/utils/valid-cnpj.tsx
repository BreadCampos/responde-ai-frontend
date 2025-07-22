export function isValidCNPJ(cnpj: string | null | undefined): boolean {
  if (!cnpj) return false;

  const cnpjDigits = cnpj.replace(/\D/g, "");

  if (cnpjDigits.length !== 14 || /^(\d)\1{13}$/.test(cnpjDigits)) {
    return false;
  }

  let size = cnpjDigits.length - 2;
  let numbers = cnpjDigits.substring(0, size);
  const digits = cnpjDigits.substring(size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) {
    return false;
  }

  size = size + 1;
  numbers = cnpjDigits.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) {
    return false;
  }

  return true;
}
