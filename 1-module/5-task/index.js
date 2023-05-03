function truncate(str, maxlength) {
  if (typeof str === 'string' && typeof maxlength === 'number' && Math.sign(maxlength) !== -1 && str.length > maxlength) {
    return str.slice(0, maxlength - 1).padEnd(maxlength, '…');
  }

  return str;
}
