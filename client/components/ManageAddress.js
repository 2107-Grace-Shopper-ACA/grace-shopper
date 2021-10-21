import React from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom'

const ManageAddress = () => {
    return(
        <div id="manageAddress">
            <h4>Show Address</h4>
            <Link to={"/settings"}><h4>Back</h4></Link>
        </div>        
    )
};

export default connect((state) => state)(ManageAddress);