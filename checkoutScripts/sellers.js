const sellers = [
  {
    "id"   : "Philco",
    "name" : "Philco"
  },
  {
    "id"   : "1",
    "name" : "Cassol Centerlar"
  }
]


let orderSellers = sellers;

const isPhilco = (list) => {

  const found = list.find(item => item.name == 'Philco')
  if(found != undefined) {
    console.log(found.name);
  } else {
  }
  // if(list.name === 'Philco'){
  //   console.log($`É ${list.name}`)
  // } else {
  //   console.log('Não é Philco');
  // }
}

isPhilco(orderSellers)
  // Pegue a listagem de sellers

    // const isPhilco = (orderSellers) => {
    //   if (orderSellers.name === "Philco") {
    //     return true;

    //   } else {
    //     return false;
    //   }
    // };
    // Verifique em cada seller no array de sellers
    // const checkOrderSellers = (orderSellers) => {
    //   if (orderSellers.find(isPhilco)) {
    //     $('.box-client-info-pj').remove()
    //   } else {

    //   }
    // };

    // checkOrderSellers(orderSellers);

