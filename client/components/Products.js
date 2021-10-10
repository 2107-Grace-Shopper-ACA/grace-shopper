import React from "react";
import { connect } from "react-redux";

const Products = ({ products }) => {
  return (
    <div id="product-gallery">
      {products.map((product) => {
        return (
          <div key={product.id}>
            <img src={product.imageUrl || "https://i.gifer.com/MNu.gif"}></img>
            <button>Add to Cart</button>
          </div>
        );
      })}
    </div>
  );
};

export default connect((state) => state)(Products);

//Emulating how the Home component is setup with the naming convention and exporting instead of the whole _Products and Products dance we're used to. If this messed up we can fall back on that. - Alex
