export function isEmpty(value: string | null | undefined): boolean {
  return value == null || value.trim() === "";
}
