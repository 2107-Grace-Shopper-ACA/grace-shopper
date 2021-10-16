import React from 'react'
import {connect} from 'react-redux'

const Cart = ({orderItems}) => {
    return (
        <div>
            {orderItems.map(orderItem => {
                return (
                    <div key={orderItem.id}>
                        <h4>{orderItem.product.name}</h4>
                        <img id='orderImg' src={orderItem.product.imageUrl || "https://i.gifer.com/MNu.gif"}></img>
                        Quantity: {orderItem.quantity}
                    </div>
                )
            })}
        </div>
    )
}


export default connect((state) => state)(Cart)