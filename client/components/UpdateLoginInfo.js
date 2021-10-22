import React from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import UpdateLoginForm from "./UpdateLoginForm";

const UpdateLoginInfo = (props) => {
    return(
        <div id="updateLoginInfo">
            <UpdateLoginForm />
            <Link to={"/settings"}><h4>Back</h4></Link>
        </div>        
    )
};

const mapState = (state)=> state


export default connect(mapState)(UpdateLoginInfo);