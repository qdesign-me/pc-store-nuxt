export function formatPhoneNumber(phone: string) {
  const cleaned = ('' + phone).replace(/\D/g, '');
  if (cleaned.length === 7) return cleaned.replace(/(\d{3})(\d{2})(\d{2})/, '$1-$2-$3');
  return cleaned.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '+$1($2) $3-$4-$5');
}
