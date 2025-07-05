export const formatDocument = (document: string) => {
  let cleaned = document?.replace(/\D/g, '');

  if (cleaned.length > 14) {
    cleaned = cleaned.substring(0, 14);
  }

  // CPF: até 11 dígitos
  if (cleaned.length <= 11) {
    cleaned = cleaned.replace(/(\d{3})(\d)/, '$1.$2');
    cleaned = cleaned.replace(/(\d{3})(\d)/, '$1.$2');
    cleaned = cleaned.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  // CNPJ: 14 dígitos
  else {
    cleaned = cleaned.replace(/^(\d{2})(\d)/, '$1.$2');
    cleaned = cleaned.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    cleaned = cleaned.replace(/\.(\d{3})(\d)/, '.$1/$2');
    cleaned = cleaned.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  }

  return cleaned;
};
