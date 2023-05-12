function isEmpty(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return false;
  }

  return !Object.keys(obj).length;
}
