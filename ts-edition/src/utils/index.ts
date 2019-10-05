export function getObjectCopy<T> (object: any): T {
  return JSON.parse(JSON.stringify(object));
}

export function validateNumber (value: string | number): number {
  return Number(value) || 0;
}
