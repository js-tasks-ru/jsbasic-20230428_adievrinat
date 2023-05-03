function checkSpam(str) {
  if (typeof str === 'string') {
    return str.toLowerCase().includes('xxx') || str.toLowerCase().includes('1xbet');
  }

  return false;
}
