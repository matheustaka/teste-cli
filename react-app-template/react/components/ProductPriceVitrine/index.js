import React, { useState, useEffect, useCallback } from 'react';
import { ProductContext } from 'vtex.product-context';
import { FormattedPrice } from 'vtex.formatted-price'
import './global.css';

function ProductPriceVitrine() {
    const productContext = React.useContext(ProductContext)

    const [unitMultiplier, setUnitMultiplier] = useState({})
    const [measurementUnit, setMeasurementUnit] = useState("")
    const [priceCaixa, setPriceCaixa] = useState(0)

    // 10% à vista
    const [discountSpot, setDiscountSpot] = useState([{}])
    const [productPrice, setProductPrice] = useState()
    const [fiveSpot, setFiveSpot] = useState(0)

    useEffect(()=> {
        setUnitMultiplier(productContext?.sku?.unitMultiplier)
        setMeasurementUnit(productContext?.sku?.measurementUnit)
        setDiscountSpot(productContext?.product?.productClusters)

        setProductPrice(productContext?.product?.priceRange?.sellingPrice?.lowPrice)

        // Defina descontos de 10% e 5%
        setFiveSpot(productContext?.product?.priceRange?.sellingPrice?.lowPrice * 0.05)
        console.log(productContext, "productContext")
    }, [productContext])

    useEffect(()=> {
        setPriceCaixa(productContext?.priceRange?.sellingPrice?.lowPrice * unitMultiplier)

      }, [unitMultiplier])

      function renderPrice() {

        // Gerar um array com os id´s dos clusters
        let clusterListIds = discountSpot?.map((cluster) => {
          return cluster.id
        })
        console.log("dd",clusterListIds)
        // Função que encontra a coleção com desconto (10 ou 5%)
        const found = (clusterList) => {
          const discountElement = clusterList?.find((cluster) => cluster == 1048 || cluster == 1049)
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
        } else if (discountClusterId == '1049') {
          return (
            // Preço com 5%
            <div className="product-price">
              <div className="product-price-calc">
                <p className="spot-product-price">
                  <FormattedPrice value={productPrice - fiveSpot} />
                  <span className="spot-message"> à vista</span>
                  <span className="spot-savings"> (5% de desconto)</span>
                </p>
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
    return <div className="product-price">
        {renderPrice()}
    </div>;
}

export default ProductPriceVitrine;
