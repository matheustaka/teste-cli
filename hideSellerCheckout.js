let paymentSec = document.getElementById('payment-data');

let paymentForm = paymentSec.firstElementChild;

// Quando estiver no pagamento
if ($(paymentForm).hasClass('active')) {
  // Pegue a listagem de sellers
    let orderSellers = vtexjs.checkout.orderForm.sellers;
    let pixLogo = $('[data-name = Pix]');

    const checkSellerCassol = (orderSellers) => {
        return orderSellers.name == 'Cassol Centerlar'
    }

    let findSellerCassol = orderSellers.find(checkSellerCassol);
    if (findSellerCassol != undefined) {
        pixLogo.remove()
    } else {
        0;
    }
}
