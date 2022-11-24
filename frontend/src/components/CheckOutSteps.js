const CheckoutSteps = {
    render: (props) => `
      <div class="checkout-steps">
        <div class="${props.step1 ? 'active' : ''}">S'identifier</div>
        <div class="${props.step2 ? 'active' : ''}">Adresse de livraison</div>
        <div class="${props.step3 ? 'active' : ''}">Paiement</div>
        <div class="${props.step4 ? 'active' : ''}">Récapitulatif de commande</div>
      </div>
      `,
  };
  export default CheckoutSteps;
  