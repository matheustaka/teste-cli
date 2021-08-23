let paymentSec = document.getElementById("payment-data");

let paymentForm = paymentSec.firstElementChild;

// Quando estiver no pagamento
if ($(paymentForm).hasClass("active")) {
  // Pegue a listagem de sellers
  let orderSellers = vtexjs.checkout.orderForm.sellers;
  let pixLogo = $("[data-name = Pix]");

  const checkSellerCassol = (orderSellers) => {
    return orderSellers.name == "Cassol Centerlar";
  };

  let findSellerCassol = orderSellers.find(checkSellerCassol);
  if (findSellerCassol != undefined) {
    pixLogo.remove();
  } else {
    0;
  }
}

// No preenchimento de dados do cliente
if ($(".client-profile-data").hasClass("active")) {
  // Pegue o form de pedido
  vtexjs.checkout.getOrderForm().done(function (orderForm) {
    // Guarde o array de sellers
    let orderSellers = orderForm.sellers;

    const isPhilco = (orderSellers) => {
      const found = orderSellers.find((seller) => seller.name == "Philco");
      // Se encontrar Philco nos sellers
      if (found != undefined) {
        $(".box-client-info-pj").remove();
      }
      // Se não encontrar Philco nos sellers
      else {
      }
    };
    // Analise se nos sellers tem Philco
    isPhilco(orderSellers);
  });
}

let paymentSec = document.getElementById("payment-data");

let paymentForm = paymentSec.firstElementChild;
function checkSellerCassol(orderSellers) {
  return orderSellers.name == "Cassol Centerlar";
}
// Quando estiver no pagamento
if ($(paymentForm).hasClass("active")) {
  // Pegue a listagem de sellers
  var orderSellers = vtexjs.checkout.orderForm.sellers;
  var pixLogo = $("[data-name = Pix]");


  checkSellerCassol(orderSellers)

  var findSellerCassol = orderSellers.find(checkSellerCassol);
  if (findSellerCassol != 'Cassol Centerlar') {
    pixLogo.remove();
  } else {
    0;
  }
}
