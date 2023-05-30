export default class UserTable {
  constructor(rows) {
    this.elem = Array.isArray(rows) ? this.#createTable(rows) : rows;
  }

  #createBody (rows) {
    const tBody = document.createElement('TBODY');
    const users = rows.map(row => {
      const tr = document.createElement('TR');
      const button = document.createElement('BUTTON');

      button.textContent = 'X';
      button.addEventListener('click', () => tr.remove());

      tr.innerHTML = `<td>${row.name}</td><td>${row.age}</td><td>${row.salary}</td><td>${row.city}</td>`;
      tr.append(button);

      return tr;
    });

    users.forEach(user => tBody.append(user));

    return tBody;
  }

  #createTable (rows) {
    const table = document.createElement('TABLE');
    const tHead = `<thead></thead><tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th></tr></thead>`;

    table.append(tHead);
    table.append(this.#createBody(rows));

    return table;
  }
}
