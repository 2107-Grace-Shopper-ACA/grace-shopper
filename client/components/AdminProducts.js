import React from 'react'
import {connect} from 'react-redux'
import { Link, useHistory } from 'react-router-dom';

/**
 * CLASS COMPONENT
 */
const AdminProducts = ({products}) => {
    const history = useHistory();
    return (
        <div>
            <div>
//TODO: add Dialog Box to Add New Product
            </div>
            <div id="product-gallery">
                {products.map((product) => {
                    return (
                    <div key={product.id}>
                        <Link to={`/admin/products/${product.id}`}>
                            {product.name} ({product.inventory}) ({(+product.price).toFixed(2)})
                            <br/>
                            <img src={product.imageUrl || "https://i.gifer.com/MNu.gif"}></img>
                        </Link>
                    </div>
                    );
                })}
            </div>    
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
