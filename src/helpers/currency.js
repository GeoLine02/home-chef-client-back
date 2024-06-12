export function toFixedMoney(distance, size = 2) {
  if (!distance || distance === 0) {
    return 0;
  }

  return Number(
    (Math.floor(Number(distance) * 10 ** size) / 10 ** size).toFixed(size),
  );
}
