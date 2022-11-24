import { signin } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils";

const SigninScreen = {
  after_render: () => {
    document
    .getElementById('signin-form')
    .addEventListener('submit', async (e) => {
      e.preventDefault();
      showLoading();
      const data = await signin({
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
      <form id="signin-form">
        <ul class="form-items">
          <li>
            <h1>S'identifier</h1>
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
            <button type="submit" class="primary">S'identifier</button>
          </li>
          <li>
            <div>
            Nouveau client?
              <a href="/#/register">Commencer ici.</a>
            </div>
          </li>
        </ul>
      </form>
    </div>
    `;
  },
};
export default SigninScreen;
