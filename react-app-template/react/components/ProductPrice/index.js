import React, { useState, useEffect, useCallback } from 'react';
import { ProductContext } from 'vtex.product-context';
import { FormattedPrice } from 'vtex.formatted-price'
import './global.css';


function ProductPrice() {
    const productContext = React.useContext(ProductContext)
    const [unitMultiplier, setUnitMultiplier] = useState({})
    const [measurementUnit, setMeasurementUnit] = useState("")
    const [priceCaixa, setPriceCaixa] = useState(0)
    useEffect(()=> {
        setUnitMultiplier(productContext.selectedItem.unitMultiplier)
        setMeasurementUnit(productContext.selectedItem.measurementUnit)
    }, [productContext])

    useEffect(()=> {
        setPriceCaixa(productContext.product.priceRange.sellingPrice.lowPrice * unitMultiplier)
    }, [unitMultiplier])


    return <div className="product-price">
        {measurementUnit === "m²" ? 
        <div className="product-price-calc">
            <p><FormattedPrice value={productContext?.product?.priceRange?.sellingPrice?.lowPrice} />/m²</p>
            <span className="caixa"><FormattedPrice value={priceCaixa} />/caixa</span>
        </div>
         : <div>
         <FormattedPrice value={productContext?.product?.priceRange?.sellingPrice?.lowPrice} /></div>}
    </div>; 
}

export default ProductPrice;