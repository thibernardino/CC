import { register } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils";

const RegisterScreen = {
  after_render: () => {
    document
    .getElementById('register-form')
    .addEventListener('submit', async (e) => {
      e.preventDefault();
      showLoading();
      const data = await register({
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
      });
      hideLoading();
      if (data.error) {
        showMessage(data.error);
      } else {
        setUserInfo(data);
        redirectUser();
      }
    });
},
render: () => {
    if (getUserInfo().name) {
      redirectUser();
    }
    return `
    <div class="form-container">
      <form id="register-form">
        <ul class="form-items">
          <li>
            <h1>Créer un compte</h1>
          </li>
          <li>
            <label for="name">Votre nom</label>
            <input type="name" name="name" id="name" />
          </li>
          <li>
            <label for="email">Adresse e-mail</label>
            <input type="email" name="email" id="email" />
          </li>
          <li>
            <label for="password">Mot de passe</label>
            <input type="password" name="password" id="password" />
          </li>
          <li>
            <label for="repassword">Entrez le mot de passe à nouveau</label>
            <input type="password" name="repassword" id="repassword" />
          </li>
          <li>
            <button type="submit" class="primary">Continuer</button>
          </li>
          <li>
            <div>
              Vous possédez déjà un compte ?
              <a href="/#/signin">Identifiez-vous</a>
            </div>
          </li>
        </ul>
      </form>
    </div>
    `;
  },
};
export default RegisterScreen;
