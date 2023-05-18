function highlight(table) {
  if (!(table instanceof HTMLElement) && table.rows.length) {
    return table;
  }

  const ageIndex = Array.from(table.tHead.rows[0].cells).findIndex(item => item.textContent.includes('Age'));
  const genderIndex = Array.from(table.tHead.rows[0].cells).findIndex(item => item.textContent.includes('Gender'));
  const statusIndex = Array.from(table.tHead.rows[0].cells).findIndex(item => item.textContent.includes('Status'));

  for (let i = 0; i < table.tBodies[0].rows.length; i++) {
    const isHasAttribute = table.tBodies[0].rows[i].cells[statusIndex].hasAttribute('data-available');
    const isMale = table.tBodies[0].rows[i].cells[genderIndex].textContent.includes('m');
    const genderClass = isMale ? 'male' : 'female';
    const age = parseInt(table.tBodies[0].rows[i].cells[ageIndex].textContent);

    if (isHasAttribute) {
      const isDataAvailable = !table.tBodies[0].rows[i].cells[statusIndex].getAttribute('data-available').localeCompare('true');
      const className = isDataAvailable ? 'available' : 'unavailable';
      table.tBodies[0].rows[i].classList.add(className);
    } else {
      table.tBodies[0].rows[i].setAttribute('hidden', 'true');
    }

    table.tBodies[0].rows[i].classList.add(genderClass);

    if (age < 18) {
      table.tBodies[0].rows[i].style.textDecoration = 'line-through';
    }
  }
}
