import React, { useState, useEffect, useCallback } from 'react';
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import './global.css';

function DiscountMinicart() {
    const { orderForm } = useOrderForm()
    console.log(orderForm, 'orderForm');
    const [items, setItems] = useState([])
    const [discountFinal, setDiscountFinal] = useState(0)
    let discount = 0;
    useEffect(() => {
        setItems(orderForm?.items)
        console.log(orderForm, 'orderForm');
    }, [orderForm])

    useEffect(() => {
        if (items[0]) {
            discount = 0
        }
        items.map((item)=> {
            const listPrice = item.listPrice;
            const unitMultiplier = item.unitMultiplier;
            const quantity = item.quantity;
            const sellingPriceQuantity = item.sellingPrice * quantity;
            if (item.measurementUnit === "m²") {
                const totalDiscount = (listPrice * unitMultiplier * quantity) - sellingPriceQuantity;
                calculateDiscount(totalDiscount)
            } else if (item.measurementUnit === "Peça") {
                const totalDiscount = (listPrice * quantity) - sellingPriceQuantity;
                calculateDiscount(totalDiscount)
            }
        })
    }, [items]);

    const calculateDiscount = useCallback((totalDiscount) => {
        discount = discount + totalDiscount;
        return setDiscountFinal(discount)
    }, [items])

    const formatedPrice = useCallback((price) => {
        return (price / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })
    }, [])

    return discountFinal !== 0 &&
        <div className="discount-minicart">
            <span>Descontos</span>
            <p>{formatedPrice(discountFinal)}</p>
        </div>
}

export default DiscountMinicart;
