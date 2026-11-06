const MAX_DIGITS = 15;

/** Vráti iba číslice telefónneho čísla. */
export function phoneDigits(input: string): string {
  return input.replace(/\D/g, "").slice(0, MAX_DIGITS);
}

/** Naformátuje vstup na "421 900 123 456" (bez "+", ten sa zobrazuje ako pevná predpona). */
export function formatPhone(input: string): string {
  const digits = phoneDigits(input);
  if (!digits) return "";
  return digits.match(/.{1,3}/g)?.join(" ") ?? "";
}

export function isValidPhone(input: string): boolean {
  const { length } = phoneDigits(input);
  return length >= 9 && length <= MAX_DIGITS;
}
