export function getObjectCopy (object) {
  return JSON.parse(JSON.stringify(object));
}

export function validateNumber (value) {
  return Number(value) || 0;
}
