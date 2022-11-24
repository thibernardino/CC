import { update, getMyOrders } from "../api";
import { getUserInfo, setUserInfo, clearUser } from "../localStorage";
import { showLoading, hideLoading, showMessage } from "../utils";

const ProfileScreen = {
  after_render: () => {
    document.getElementById("signout-button").addEventListener("click", () => {
      clearUser();
      document.location.hash = "/";
    });
    document
      .getElementById("profile-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        showLoading();
        const data = await update({
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        });
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          setUserInfo(data);
          document.location.hash = "/";
        }
      });
  },
  render: async () => {
    const { name, email } = getUserInfo();
    if (!name) {
      document.location.hash = "/";
    }
    const orders = await getMyOrders();
    return `
    <div class="content profile">
      <div class="profile-info">
      <div class="form-container">
      <form id="profile-form">
        <ul class="form-items">
          <li>
            <h1>Profil de l'utilisateur</h1>
          </li>
          <li>
            <label for="name">Nom</label>
            <input type="name" name="name" id="name" value="${name}" />
          </li>
          <li>
            <label for="email">Adresse e-mail</label>
            <input type="email" name="email" id="email" value="${email}" />
          </li>
          <li>
            <label for="password">Mot de passe</label>
            <input type="password" name="password" id="password" />
          </li>
          <li>
            <button type="submit" class="primary">Mise à jour</button>
          </li>
          <li>
          <button type="button" id="signout-button" >Se déconnecter</button>
        </li>        
        </ul>
      </form>
    </div>
      </div>
      <div class="profile-orders">
      <h2>Historique des commandes</h2>
        <table>
          <thead>
            <tr>
              <th>NR. COMMANDE</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAYÉ</th>
              <th>LIVRÉ</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            ${
              orders.length === 0
                ? `<tr><td colspan="6">Aucune commande trouvée.</tr>`
                : orders
                    .map(
                      (order) => `
          <tr>
            <td>${order._id}</td>
            <td>${order.createdAt}</td>
            <td>${order.totalPrice}</td>
            <td>${order.paidAt || "Non"}</td>
            <td>${order.deliveryAt || "Non"}</td>
            <td><a href="/#/order/${order._id}">DÉTAILS</a> </td>
          </tr>
          `
                    )
                    .join("\n")
            }
          </tbody>
        </table>
      </div>
    </div>
    `;
  },
};
export default ProfileScreen;