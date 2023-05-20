function highlight(table) {
  if (!(table instanceof HTMLElement) || !table.rows.length) {
    return table;
  }

  const tBody = table.tBodies[0];
  const getIndex = name => Array.from(table.tHead.rows[0].cells).findIndex(item => item.textContent.includes(name));
  const ageIndex = getIndex('Age');
  const genderIndex = getIndex('Gender');
  const statusIndex = getIndex('Status');

  const addStatusClass = (row, statusIndex) => {
    if ('available' in row.cells[statusIndex].dataset) {
      const isDataAvailable = row.cells[statusIndex].dataset.available === 'true';

      row.classList.add(isDataAvailable ? 'available' : 'unavailable');
    } else {
      row.setAttribute('hidden', true);
    }
  };

  for (let i = 0; i < tBody.rows.length; i++) {
    if (statusIndex !== -1) {
      addStatusClass(tBody.rows[i], statusIndex);
    }

    if (genderIndex !== -1) {
      tBody.rows[i].classList.add(tBody.rows[i].cells[genderIndex].textContent.includes('m') ? 'male' : 'female');
    }

    if (ageIndex !== -1 && parseInt(tBody.rows[i].cells[ageIndex].textContent) &&
      parseInt(tBody.rows[i].cells[ageIndex].textContent) < 18) {
      tBody.rows[i].style.textDecoration = 'line-through';
    }
  }
}
