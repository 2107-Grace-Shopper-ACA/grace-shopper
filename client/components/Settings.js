import React from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom'

const Settings = (props) => {
    return(
        <div id="settings">
            <Link to="/settings/manageAddress"><h4>Manage Address</h4></Link>
            <Link to="/settings/updateLoginInfo"><h4>Update Login Info</h4></Link>
            <Link to="/settings/updatePersonalInfo"><h4>Update Personal Info</h4></Link>
            <Link to={"/home"}><h4>Back</h4></Link>
            {console.log(props)}
        </div>        
    )
};

export default connect((state) => state)(Settings);