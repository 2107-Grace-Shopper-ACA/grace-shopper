import React from "react";
import { connect } from "react-redux";

const SingleProduct = ({products}) => {
    const product = products.find(product => product.id === match.params.id*1)
    const { name, description, imageUrl, price } = product
    return(
        <div id="single-product-gallery">
            <img src={imageUrl || "https://i.gifer.com/MNu.gif"}></img>
            <div>{name}</div>
            <div>{description}</div>
            <div>{price}</div>
            <button>Add to Cart</button>
        </div>        
    )
};

export default connect((state) => state)(SingleProduct);