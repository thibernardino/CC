import { getUserInfo } from "../localStorage";
import { parseRequestUrl } from "../utils";

const Header = {
  render: () => {
    const { name, isAdmin } = getUserInfo();
    const { value } = parseRequestUrl();
    return `
        
        <div class="brand">
        <button id="aside-open-button">
        &#9776;
        </button>
        </div>
        <div class="brand">
        <a href="/#/">
        <img src="images/CCLogo.png"
        alt="Logo Cadré Carton"
        width="109"
        height="50"
        >
        </a>

         </footer>
        </div>
        <div class="search">
        <form class="search-form"  id="search-form">
        <input type="text" name="q" id="q" value="${value || ""}" /> 
        <button type="submit"><i class="fa fa-search"></i></button>
        </form>        
        </div>

        <div>
        ${
          name
            ? `<a href="/#/profile">${name}</a>`
            : `<a href="/#/signin">S'identifier</a>`
        }
          <a href="/#/cart">Panier</a>
          ${isAdmin ? `<a href="/#/dashboard">Dashboard</a>` : ""}
        </div>`;
  },
  after_render: () => {
    document
      .getElementById("search-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const searchKeyword = document.getElementById("q").value;
        document.location.hash = `/?q=${searchKeyword}`;
      });

    document
      .getElementById("aside-open-button")
      .addEventListener("click", async () => {
        document.getElementById("aside-container").classList.add("open");
      });
  },
};
export default Header;
