import React from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom'

const UpdatePersonalInfo = () => {
    return(
        <div id="updatePersonalInfo">
            <h4>Show Personal Info</h4>
            <Link to={"/settings"}><h4>Back</h4></Link>
        </div>        
    )
};

export default connect((state) => state)(UpdatePersonalInfo);