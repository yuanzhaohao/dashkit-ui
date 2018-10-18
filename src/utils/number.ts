export function rangeNumber(end: number, start = 0) {
  return Array.from({ length: (end - start) }, (v, k) => k + start);
}