import React from "react";
import { connect } from "react-redux";
import {createOrderItem} from '../store/orderItems'

const Products = ({ products, createOrderItem }) => {
  return (
    <div id="product-gallery">
      {products.map((product) => {
        return (
          <div key={product.id}>
            <h4>{product.name}</h4>
            <img src={product.imageUrl || "https://i.gifer.com/MNu.gif"}></img>
            <label htmlFor="product-quantity">Quantity:</label>
            <input type="number" id="product-quantity" min="1" max="9"/>
            {/* Hardcoding one for now to test */}
            <button type="button" onClick={() => {createOrderItem({id: product.id, quantity: 1})}}>Add to Cart</button>
          </div>
        );
      })}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrderItem: (product) => {
      console.log(`product object: ${JSON.stringify(product)}`)
      dispatch(createOrderItem(product))
    }
  }
}

export default connect((state) => state, mapDispatchToProps)(Products);

//Emulating how the Home component is setup with the naming convention and exporting instead of the whole _Products and Products dance we're used to. If this messed up we can fall back on that. - Alex
