function highlight(table) {
  if (!(table instanceof HTMLElement) || !table.rows.length) {
    return table;
  }

  const headRows = table.tHead.rows[0];
  const tBody = table.tBodies[0];
  const ageIndex = Array.from(headRows.cells).findIndex(item => item.textContent.includes('Age'));
  const genderIndex = Array.from(headRows.cells).findIndex(item => item.textContent.includes('Gender'));
  const statusIndex = Array.from(headRows.cells).findIndex(item => item.textContent.includes('Status'));

  const addStatusClass = (row, statusIndex) => {
    const isHasAttribute = row.cells[statusIndex].hasAttribute('data-available');

    if (isHasAttribute) {
      const isDataAvailable = !row.cells[statusIndex].getAttribute('data-available').localeCompare('true');
      const className = isDataAvailable ? 'available' : 'unavailable';
      row.classList.add(className);
    } else {
      row.setAttribute('hidden', 'true');
    }
  };

  const addGenderClass = (row, genderIndex) => {
    const isMale = row.cells[genderIndex].textContent.includes('m');
    const genderClass = isMale ? 'male' : 'female';

    row.classList.add(genderClass);
  };

  const textDecorationForAge = (row, ageIndex) => {
    const age = parseInt(row.cells[ageIndex].textContent);

    if (age && age < 18) {
      row.style.textDecoration = 'line-through';
    }
  };

  for (let i = 0; i < tBody.rows.length; i++) {
    if (isFinite(statusIndex) && genderIndex !== -1) {
      addStatusClass(tBody.rows[i], statusIndex);
    }

    if (isFinite(genderIndex) && genderIndex !== -1) {
      addGenderClass(tBody.rows[i], genderIndex);
    }

    if (isFinite(ageIndex) && ageIndex !== -1) {
      textDecorationForAge(tBody.rows[i], ageIndex);
    }
  }
}
