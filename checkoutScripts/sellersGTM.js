if ($(".client-profile-data").hasClass("active")) {
  // Pegue o form de pedido
  vtexjs.checkout.getOrderForm().done(function (orderForm) {
    // Guarde o array de sellers
    var orderSellers = orderForm.sellers;

    // verifique qual é o seller philco
    function handleCheckPhilco(seller) {
      return seller.name === "Philco";
    }
    function handleCheckSeller(orderSellers) {
      return orderSellers.find(handleCheckPhilco);
    }

    // Se tiver philco
    if(handleCheckSeller(orderSellers) != undefined) {
      // remova os dados pj
      $(".box-client-info-pj").remove();
    } else {

    }
    handleCheckSeller(orderSellers)
  });
}
