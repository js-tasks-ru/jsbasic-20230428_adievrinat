function isEmpty(obj) {
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    return false;
  }

  return !Object.keys(obj).length;
}
