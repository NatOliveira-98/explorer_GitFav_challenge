export default class AddUser {
  constructor({ view }) {
    this.view = view;
    this.userData = [];
  }

  initialize() {
    this.loadDataFromLocalStorage();
    this.view.addBtn(this.addUser.bind(this));
  }

  loadDataFromLocalStorage() {
    this.userData = JSON.parse(localStorage.getItem('gitfav:')) || [];
    this.updateAllUsers(this.userData);
    this.checkIfEmpty();
  }

  saveDataToLocalStorage() {
    localStorage.setItem('gitfav:', JSON.stringify(this.userData));
  }

  updateAllUsers(users) {
    this.view.removeAllTr();

    const html = users.map(user => this.view.createUserHtml(user)).join('');
    this.view.insertUserOnDOM(html);

    this.view.removeBtn(this.deleteUser.bind(this));
  }

  async addUser() {
    try {
      const { value } = document.querySelector('.search input');

      const checkUserExistence = this.userData.find(
        users => users.login === value,
      );
      if (checkUserExistence) {
        throw new Error('Usuário já cadastrado');
      }

      const user = await this.fetchUser(value);
      if (user.login === undefined) {
        throw new Error('Ops, houve um erro');
      }

      this.userData = [user, ...this.userData];

      this.updateAllUsers(this.userData);
      this.saveDataToLocalStorage();

      // reset input value
      document.querySelector('.search input').value = '';
      //
    } catch (error) {
      alert(error.message);
    }
  }

  async fetchUser(username) {
    const endpoint = `https://api.github.com/users/${username}`;

    const response = await fetch(endpoint);
    const data = await response.json();
    const { login, name, public_repos, followers } = data;

    return {
      login,
      name,
      public_repos,
      followers,
    };
  }

  deleteUser(username) {
    const selectedUser = this.userData.filter(item => item.login !== username);

    this.userData = selectedUser;
    this.updateAllUsers(this.userData);
    this.saveDataToLocalStorage();
    this.checkIfEmpty();
  }

  checkIfEmpty() {
    const isEmpty = Object.keys(this.userData).length === 0;

    if (isEmpty) {
      this.view.insertEmptyTableOnDOM(this.view.createEmptyTable());
      return;
    }
  }
}
