function isObject(
  value: unknown,
  key: string,
): value is Record<string, unknown> {
  return Object.prototype.hasOwnProperty.call(value, key);
}

export function deepEquals<T, G>(targetA: T, targetB: G): boolean {
  if (Object.is(targetA, targetB)) return true;

  if (
    typeof targetA !== "object" ||
    targetA === null ||
    typeof targetB !== "object" ||
    targetB === null
  ) {
    return false;
  }

  const isArrayA = Array.isArray(targetA);
  const isArrayB = Array.isArray(targetB);

  if (isArrayA !== isArrayB) return false;

  if (isArrayA && isArrayB) {
    if (targetA.length !== targetB.length) return false;
    return targetA.every((value, index) => deepEquals(value, targetB[index]));
  }

  const keysA = Object.keys(targetA);
  const keysB = Object.keys(targetB);

  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) => {
    return (
      isObject(targetA, key) &&
      isObject(targetB, key) &&
      deepEquals(targetA[key], targetB[key])
    );
  });
}
