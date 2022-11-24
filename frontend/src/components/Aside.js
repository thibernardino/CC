const Aside = {
    render: async () => `
     <div class="aside-header">
      <div>Catégories</div>
      <button class="aside-close-button" id="aside-close-button">X</button>
    </div>
    <div class="aside-body">
      <ul class="categories">
        <li>
          <a href="/#/?q=cadre"
            >Cadre
            <span><i class="fa fa-chevron-right"></i></span>
          </a>
        </li>
        <li>
          <a href="/#/?q=lampe"
            >Lamp
            <span><i class="fa fa-chevron-right"></i></span>
          </a>
        </li> 
        <li>
        <a href="/#/?q=photo"
          >Photo
          <span><i class="fa fa-chevron-right"></i></span>
        </a>
      </li> 

      </ul>
    </div>`,
    after_render: async () => {
      document.getElementById('aside-container').classList.remove('open');
      document
        .getElementById('aside-close-button')
        .addEventListener('click', async () => {
          document.getElementById('aside-container').classList.remove('open');
        });
    },
  };
  
  export default Aside;
  