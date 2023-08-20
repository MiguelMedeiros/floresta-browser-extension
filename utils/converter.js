export function swap16(val) {
  return ((val & 0xff) << 8) | ((val >> 8) & 0xff);
}
