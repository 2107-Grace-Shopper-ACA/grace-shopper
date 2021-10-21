import React from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import UpdateLoginForm from "./UpdateLoginForm";

const UpdateLoginInfo = ({history, user}) => {
    return(
        <div id="updateLoginInfo">
            <UpdateLoginForm history={history} user={user} action={'edit'}/>
            <Link to={"/settings"}><h4>Back</h4></Link>
        </div>        
    )
};

const mapState = (state, {match, history}) => {
    return {
        user: state.users.find(user => user.id === match.params.id*1) || {},
        history: history
    }
}

export default connect(mapState)(UpdateLoginInfo);