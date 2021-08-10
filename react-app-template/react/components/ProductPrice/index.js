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
        console.log("joaod", productContext)
    }, [productContext])

    useEffect(()=> {
        setPriceCaixa(productContext.product.priceRange.sellingPrice.lowPrice * unitMultiplier)
    }, [unitMultiplier])


    return <div className="product-price">
        {measurementUnit === "m²" ? 
        <div className="product-price-calc">
            <p><FormattedPrice value={productContext?.selectedItem?.sellers[0]?.commertialOffer?.Price} /> <span className="product-price__measurementUnit">/m²</span> </p>
            <span className="caixa"><FormattedPrice value={priceCaixa} />/caixa</span>
        </div>
         : <div>
         <FormattedPrice value={productContext?.selectedItem?.sellers[0]?.commertialOffer?.Price} /></div>}
    </div>; 
}

export default ProductPrice;