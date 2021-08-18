// Ocultar a opção de pagamento no Cartão cassol
if($('#payment-group-customPrivate_401PaymentGroup').is(":visible")){
  vtexjs.checkout.getOrderForm().then(function(orderForm) {
    var cart = orderForm.items

    cart.map(function(item) {
      var seller = item.seller
      var isSeller = seller.indexOf(1)

      if(isSeller !== 0){
        $('#payment-group-customPrivate_401PaymentGroup').remove();
        $('#payment-group-customPrivate_401PaymentGroup').hide();
        $('div#iframe-placeholder-customPrivate_401PaymentGroup').remove();
        $('div#iframe-placeholder-customPrivate_401PaymentGroup').hide();
      }
    })
  })
}
