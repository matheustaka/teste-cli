import React, { useState, useEffect, useCallback } from 'react';
import { ProductContext } from 'vtex.product-context';
import { FormattedPrice } from 'vtex.formatted-price'
import './global.css';

function ProductPriceVitrine() {
    const productContext = React.useContext(ProductContext)
    const { product } = productContext;
    const [unitMultiplier, setUnitMultiplier] = useState({})
    const [measurementUnit, setMeasurementUnit] = useState("")
    const [priceCaixa, setPriceCaixa] = useState(0)

    useEffect(()=> {
        setUnitMultiplier(product.sku.unitMultiplier)
        setMeasurementUnit(product.sku.measurementUnit)
        console.log(product)
    }, [product])

    useEffect(()=> {
        setPriceCaixa(product.priceRange.sellingPrice.lowPrice * unitMultiplier)
    }, [unitMultiplier])


    return <div className="product-price">
        {measurementUnit === "m²" ? 
        <div className="product-price-calc-shelf">
            <p><FormattedPrice value={product?.priceRange?.sellingPrice?.lowPrice} /> <span className="product-price__measurementUnit">/m²</span> </p>
            <span className="caixa"><FormattedPrice value={priceCaixa} /> <span>/caixa</span> </span>
        </div>
         : 
         <div className="product-price-calc-shelf"><FormattedPrice value={product?.priceRange?.sellingPrice?.lowPrice} /></div>}
    </div>; 
}
 
export default ProductPriceVitrine;