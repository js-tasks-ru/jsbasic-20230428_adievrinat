function filterRange(arr, a, b) {
  if (!arr || !Array.isArray(arr) || typeof a !== 'number' || typeof b !== 'number') {
    return [];
  }

  return arr.filter(item => a <= item && item <= b);
}
