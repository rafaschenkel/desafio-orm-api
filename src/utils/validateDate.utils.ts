export default function isValidDate(value: unknown): boolean {
  if (typeof value === "string") {
    if (/^\d+$/.test(value)) return false; // Rejeita strings numéricas puras
    const date = new Date(value);
    return !isNaN(date.getTime());
  }

  return false;
}
