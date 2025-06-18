export const formatPhoneNumber = (phone: string) => {
  let cleaned = phone.replace(/\D/g, '');

  if (cleaned.length > 11) {
    cleaned = cleaned.slice(0, 11);
  }

  // (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
  if (cleaned.length <= 10) {
    // Fixo: (99) 9999-9999
    cleaned = cleaned.replace(/^(\d{2})(\d)/, '($1) $2');
    cleaned = cleaned.replace(/(\d{4})(\d)/, '$1-$2');
  } else {
    // Celular: (99) 99999-9999
    cleaned = cleaned.replace(/^(\d{2})(\d)/, '($1) $2');
    cleaned = cleaned.replace(/(\d{5})(\d)/, '$1-$2');
  }

  return cleaned;
};
