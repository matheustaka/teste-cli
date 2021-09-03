import React, { useState, useEffect, useCallback } from 'react';
import { ProductContext } from 'vtex.product-context';
import { FormattedPrice } from 'vtex.formatted-price'
import './global.css';


function ProductPrice() {
  const productContext = React.useContext(ProductContext)
  const [unitMultiplier, setUnitMultiplier] = useState({})
  const [measurementUnit, setMeasurementUnit] = useState("")

  // 10% à vista
  const [discountSpot, setDiscountSpot] = useState([{}])
  const [productPrice, setProductPrice] = useState()
  const [tenSpot, setTenSpot] = useState(0)
  const [fiveSpot, setFiveSpot] = useState(0)

  const [priceCaixa, setPriceCaixa] = useState(0)
  useEffect(() => {
    setUnitMultiplier(productContext.selectedItem.unitMultiplier)
    setMeasurementUnit(productContext.selectedItem.measurementUnit)
    setDiscountSpot(productContext.product.productClusters)

    setProductPrice(productContext.product.priceRange.sellingPrice.lowPrice)

    // Defina descontos de 10% e 5%
    setTenSpot(productContext.product.priceRange.sellingPrice.lowPrice * 0.1)
    setFiveSpot(productContext.product.priceRange.sellingPrice.lowPrice * 0.05)
  }, [productContext])

  useEffect(() => {
    setPriceCaixa((productContext.product.priceRange.sellingPrice.lowPrice * unitMultiplier).toFixed(2))
  }, [unitMultiplier])

  function renderPrice() {

    // Gerar um array com os id´s dos clusters
    let clusterListIds = discountSpot.map((cluster) => {
      return cluster.id
    })

    // Função que encontra a coleção com desconto
    const found = (clusterList) => {
      const discountElement = clusterList.find((cluster) => cluster == 1048 || cluster == 1049)
      return discountElement
    }

    let discountClusterId = found(clusterListIds)

    if (measurementUnit === "m²" || measurementUnit === "M2") {
      return (

        <div className="product-price">
          <div className="product-price-calc">
            <p>

              <FormattedPrice value={priceCaixa} />
              <span className="product-price__measurementUnit">/caixa</span>
            </p>

          </div>
        </div>

      )
    } else if (discountClusterId == '1048') {
      return (
        // Preço com 10%
        <div className="product-price">
          <div className="product-price-calc">
            <p className="spot-product-price">
              <FormattedPrice value={productPrice - tenSpot} />
              <span className="spot-message"> à vista</span>
              <span className="spot-savings"> (10% de desconto)</span>
            </p>
          </div>
        </div>

      )
    } else if (discountClusterId == '1049') {
      return (
        // Preço com 5%
        <div className="product-price">
          <div className="product-price-calc">
            <p className="spot-product-price">
              <FormattedPrice value={productPrice - fiveSpot} />
              <span className="spot-message"> à vista</span>
            </p>
            <span className="spot-savings"> (5% de desconto)</span>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <FormattedPrice value={productContext?.product?.priceRange?.sellingPrice?.lowPrice} />
        </div>
      )
    }
  }
  return (
    renderPrice()
  )
  // return <div className="product-price">
  //   {measurementUnit === "m²" || measurementUnit === "M2" ?
  //     // TRUE RETURN

  //     <div className="product-price-calc">
  //       <p>

  //         <FormattedPrice value={priceCaixa} />
  //         <span className="product-price__measurementUnit">/caixa</span>
  //       </p>
  //       {/* <span className="caixa">
  //       <FormattedPrice value={productContext?.product?.priceRange?.sellingPrice?.lowPrice} />
  //       </span> */}
  //     </div>
  //     :
  //     // FALSE

  //     <div>
  //       <FormattedPrice value={productContext?.product?.priceRange?.sellingPrice?.lowPrice} />
  //     </div>}
  // </div>;
}

export default ProductPrice;

