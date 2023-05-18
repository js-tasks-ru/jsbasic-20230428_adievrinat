function highlight(table) {
  if (!(table instanceof HTMLElement) || !table.rows.length) {
    return table;
  }

  const tBody = table.tBodies[0];
  const ageIndex = Array.from(table.tHead.rows[0].cells).findIndex(item => item.textContent.includes('Age'));
  const genderIndex = Array.from(table.tHead.rows[0].cells).findIndex(item => item.textContent.includes('Gender'));
  const statusIndex = Array.from(table.tHead.rows[0].cells).findIndex(item => item.textContent.includes('Status'));

  const addStatusClass = (row, statusIndex) => {
    if (row.cells[statusIndex].hasAttribute('data-available')) {
      const isDataAvailable = !row.cells[statusIndex].getAttribute('data-available').localeCompare('true');

      row.classList.add(isDataAvailable ? 'available' : 'unavailable');
    } else {
      row.setAttribute('hidden', true);
    }
  };

  const addGenderClass = (row, genderIndex) => {
    row.classList.add(row.cells[genderIndex].textContent.includes('m') ? 'male' : 'female');
  };

  const textDecorationForAge = (row, value) => {
    row.style.textDecoration = value;
  };

  for (let i = 0; i < tBody.rows.length; i++) {
    if (isFinite(statusIndex) && genderIndex !== -1) {
      addStatusClass(tBody.rows[i], statusIndex);
    }

    if (isFinite(genderIndex) && genderIndex !== -1) {
      addGenderClass(tBody.rows[i], genderIndex);
    }

    if (isFinite(ageIndex) && ageIndex !== -1 && parseInt((tBody.rows[i].cells[ageIndex].textContent) &&
      parseInt(tBody.rows[i].cells[ageIndex].textContent) < 18)) {
      textDecorationForAge(tBody.rows[i], 'line-through');
    }
  }
}
