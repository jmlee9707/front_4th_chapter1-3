function isObject(target: unknown): target is Record<string, unknown> {
  return typeof target === "object";
}

export function shallowEquals<T>(objA: T, objB: T) {
  if (Object.is(objA, objB)) {
    return true;
  }

  if (typeof objA !== "object" || typeof objB !== "object") {
    return false;
  }

  if (objA === null || objB === null) {
    return false;
  }

  const objAKeys = Object.keys(objA);
  const objBKeys = Object.keys(objB);

  if (objAKeys.length !== objBKeys.length) {
    return false;
  }

  if (!isObject(objA) || !isObject(objB)) {
    return false;
  }

  return objAKeys.every((key) => Object.is(objA[key], objB[key]));
}
