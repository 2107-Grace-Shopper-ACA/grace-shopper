import React from "react";
import { connect } from "react-redux";

const Settings = () => {
    // const product = products.find(product => product.id === match.params.id*1)
    // const { name, description, imageUrl, price } = product
    return(
        <div id="settings">
            <h4>Manage Address</h4>
            <h4>Update Login Info</h4>
        </div>        
    )
};

export default connect((state) => state)(Settings);