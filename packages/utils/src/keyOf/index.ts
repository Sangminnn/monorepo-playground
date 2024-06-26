export function keyOf<T extends Object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}
