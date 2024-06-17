export function toFixedMoney(distance: number, size = 2): number {
  if (!distance || distance === 0) {
    return 0;
  }

  return Number(
    (Math.floor(Number(distance) * 10 ** size) / 10 ** size).toFixed(size),
  );
}
