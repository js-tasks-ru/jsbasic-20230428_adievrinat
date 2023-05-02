function truncate(str, maxlength) {
  if (!str && typeof str !== 'string') {
    return console.error('truncate: the "str" argument is incorrect or undefined');
  }

  if (!maxlength || !Number(maxlength) || Math.sign(maxlength) === -1) {
    return console.error('truncate: the "maxlength" argument is incorrect or undefined');
  }

  return str.length > maxlength ? str.slice(0, maxlength - 1).padEnd(maxlength, '…') : str;
}
