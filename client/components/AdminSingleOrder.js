import React, { Component } from 'react'
import {connect} from 'react-redux'
import { addProduct, editProduct } from '../store'
import axios from 'axios';
/**
 * CLASS COMPONENT
 */

//getting warning about changing controlled input
//TODO: handle errors
class AdminSingleOrder extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            inventory: '',
            price: '',
            description: '',
            imageUrl: '',
            error: ''
        }
        this.onChange = this.onChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.fillForm = this.fillForm.bind(this);
    }
    fillForm(){
        const { name, inventory, price, description, imageUrl } = this.props.product
        this.setState({name, inventory, price, description, imageUrl});
    }
    componentDidMount(){
        this.fillForm();
    }
    componentDidUpdate(prevProps){
        if(prevProps.product !== this.props.product){
            this.fillForm();
        }
    }
    

    onChange(ev) {
        const change = {};
        change[ev.target.name] = ev.target.value;
        this.setState(change);
    }
    async onSubmit(ev){
        ev.preventDefault();
        try{
            await this.props.editProduct({...this.props.product, ...this.state});
        } 
        catch (ex){
            console.log(ex);
            this.setState({error: ex.response.data.error});       
        }
    }
    render () {
        const { name, inventory, price, imageUrl, description } = this.state;
        const { handleClick, onChange, onSubmit } = this;
        const { product } = this.props;

        return (
            <div>
                    TODO: ADD SINGLE ORDER
                <form onSubmit={onSubmit}>
                    {/* <label>
                        Order:
                    </label>
                        <input name='name' value={name} onChange={onChange} />
                    <label>
                        Price:
                    </label>
                        <input name='price' value={price} onChange={onChange} />
                    <label>
                        Inventory:
                    </label>
                        <input name='inventory' value={inventory} onChange={onChange} />
                    <label>
                        Description:
                    </label>
                        <textarea rows='10' cols='50' name='description' value={description} onChange={onChange} />
                    <label>
                        Image URL:
                    </label>
                        <textarea rows='10' cols='50' name='imageUrl' value={imageUrl} onChange={onChange} /> */}
                    <br/>
                    <button>Edit</button>
                </form>
                <button value={order.id} onClick={handleClick}>Delete Order</button>
            </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = (state, {match}) => {
  return {
    order: state.orders.find(order => order.id === match.params.id) || {}
  }
}

const mapDispatch = (dispatch, { history }) => {
    return {
        editProduct: (product) => dispatch(editProduct(product, history)),
        
    }
}

export default connect(mapState, mapDispatch)(AdminSingleOrder)
