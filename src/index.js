import AddUser from './AddUser.js';
import View from './View.js';

function onLoad() {
  const dependencies = {
    view: View,
  };

  const addUser = new AddUser(dependencies);
  addUser.initialize();
}

window.onload = onLoad;
