const APP_ID = document.getElementById('page-container');

export default class View {
  static createUserHtml(username) {
    return `
    <tr>
      <td class="user">
        <img
          src="https://github.com/${username.login}.png"
          alt="Imagem do usuário"
        />
        <a href="https://github.com/${username.login}" target="_blank">
          <p>${username.name}</p>
          <span>/${username.login}</span>
        </a>
      </td>
      <td class="repositories">${username.public_repos}</td>
      <td class="followers">${username.followers}</td>
      <td class="btn-container">
        <button class="remove-user">Remover</button>
      </td>
    </tr>
  `;
  }

  static insertUserOnDOM(userHtml) {
    const table = APP_ID.querySelector('table tbody');
    return (table.innerHTML = userHtml);
  }

  static createEmptyTable() {
    return `
    <tr class="no-favorites">
      <td>
        <div>
          <img src="./assets/star-big.svg" alt="" />
          <p>Nenhum favorito ainda</p>
        </div>
      </td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  `;
  }

  static insertEmptyTableOnDOM(emptyTable) {
    const table = APP_ID.querySelector('table tbody');
    table.innerHTML = emptyTable;
  }

  static removeAllTr() {
    const tbody = APP_ID.querySelector('table tbody');
    tbody.querySelectorAll('tr').forEach(tr => tr.remove());
  }

  static addBtn(onClickFunc) {
    const btn = APP_ID.querySelector('.search button');
    btn.onclick = onClickFunc;
  }

  static removeBtn(onClickFunc) {
    const deleteBtn = document.querySelectorAll('.remove-user');
    deleteBtn.forEach(
      btn =>
        (btn.onclick = () => {
          const isOkToDelete = confirm(
            'Tem certeza que deseja remover este usuário?',
          );
          if (isOkToDelete) {
            onClickFunc(View.getUserName(btn));
          }
        }),
    );
  }

  static getUserName(user) {
    const tdUser =
      user.parentElement.previousElementSibling.previousElementSibling
        .previousElementSibling;
    const userHref = tdUser.lastElementChild.href;
    const userUrlSpliterd = userHref.split('/');
    const username = userUrlSpliterd[userUrlSpliterd.length - 1];

    return username;
  }
}
