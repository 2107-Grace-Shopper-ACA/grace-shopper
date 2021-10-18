import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';

/**
 * CLASS COMPONENT
 */
const AdminProducts = ({products}) => {
    return (
        <div id="product-gallery">
            {products.map((product) => {
                return (
                <div key={product.id}>
                    <Link to={`/admin/products/${product.id}`}>
                        {product.name}
                        <br/>
                        <img src={product.imageUrl || "https://i.gifer.com/MNu.gif"}></img>
                    </Link>
                </div>
                );
            })}
        </div>    
    )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    products: state.products
  }
}

export default connect(mapState)(AdminProducts)
