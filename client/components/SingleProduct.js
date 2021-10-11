import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../store";

class SingleProduct extends Component {
    componentDidMount () {
        const productId = this.props.match.paramsproductId
        this.props.loadProduct(productId)
    }

    render() {
        const product = this.props.singleProduct
        const { name, description, imageUrl, price } = product
        return (
        <div id="single-product-gallery">
            <img src={imageUrl || "https://i.gifer.com/MNu.gif"}></img>
            <div>{name}</div>
            <div>{description}</div>
            <div>{price}</div>
            <button>Add to Cart</button>
        </div>
        )
    }
    
};

const mapState = (singleProduct) => (singleProduct)

const mapDispatch = (disptach) => {
    return {
        loadProduct: (productId) => disptach(fetchProduct(productId))
    }
}

export default connect(mapState, mapDispatch)(SingleProduct);

//Emulating how the Home component is setup with the naming convention and exporting instead of the whole _Products and Products dance we're used to. If this messed up we can fall back on that. - Alex
