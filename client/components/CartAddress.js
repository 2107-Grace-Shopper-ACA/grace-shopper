import React, { Component } from 'react'
import {connect} from 'react-redux'
import { editCartUser } from '../store'

class CartAddress extends Component {
    constructor(props){
        super(props);
        const {user} = this.props
        this.state = {
            streetAddress: user.id ? user.streetAddress : '',
            city: user.id ? user.city : '',
            state: user.id ? user.state : '',
            zipcode: user.id ? user.zipcode : '',
            error: '',
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentDidUpdate (prevProps){
        if (!prevProps.user.id && this.props.user.id) {
            const { streetAddress, city, state, zipcode } = this.props.user;
            this.setState({ streetAddress, city, state, zipcode });
        }
    }
    
    onChange(ev) {
        const change = {};
        change[ev.target.name] = ev.target.value;
        this.setState(change);
    }

    async onSubmit(ev){
        ev.preventDefault();
        const { streetAddress, city, state, zipcode } = this.state;
        const { history, editCartUser, user } = this.props;
        try{
            await editCartUser({...user, streetAddress, city, state, zipcode }, history);
        } 
        catch (ex){
            this.setState({error: ex.response.data.error});  
        }
    }
    render () {
        const { streetAddress, city, state, zipcode } = this.state;
        const { onChange, onSubmit } = this;

        if (!this.props.user) return '...loading'
        return (
            <div>
                <form onSubmit={onSubmit}>
                    Please confirm your address before checkout.
                    <label>
                        Street Address:
                    </label>
                        <input name='streetAddress' value={streetAddress} onChange={onChange} /> 
                    <label>
                        City:
                    </label>
                        <input name='city' value={city} onChange={onChange} /> 
                    <label>
                        State:
                    </label>
                        <input name='state' value={state} onChange={onChange} /> 
                    <label>
                        Zipcode:
                    </label>
                        <input name='zipcode' value={zipcode} onChange={onChange} /> 
                    <button type='submit' disabled={!streetAddress || !city || !state || !zipcode}>Confirm</button>
                </form>
            </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = state => {
    return {
        auth: state.auth,
        user: state.user
    }
}
const mapDispatch = (dispatch, {history}) => {
    return {
        editCartUser: (user) => dispatch(editCartUser(user, history)),
    }
}

export default connect(mapState, mapDispatch)(CartAddress)