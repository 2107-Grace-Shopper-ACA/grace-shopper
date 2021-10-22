import React, { Component } from 'react'
import {connect} from 'react-redux'
import { addProduct, editProduct } from '../store'
/**
 * CLASS COMPONENT
 */

//getting warning about changing controlled input
//TODO: handle errors
class AdminProductForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            inventory: '',
            price: '',
            description: '',
            imageUrl: '',
            isActive: true,
            onSale: false,
            category: '',
            error: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentDidMount(){
        if (this.props.action === 'edit'){
            const { name, inventory, price, description, imageUrl, category } = this.props.product;
            this.setState({name, inventory, price, description, imageUrl, category});
        }
    }

    onChange(ev) {
        const change = {};
        change[ev.target.name] = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
        this.setState(change);
    }

    async onSubmit(ev){
        ev.preventDefault();
        const { name, inventory, price, imageUrl, description, isActive, onSale,  category} = this.state;
        const { history, handleClose, action, editProduct, addProduct, product } = this.props;
        try{
            if(action === 'edit'){
                await editProduct({...product, name, inventory, price, imageUrl, description, isActive, onSale,  category}, history);
            } else {
                await addProduct({name, inventory, price, imageUrl, description, isActive, onSale,  category}, history);
//TODO figure out synthetic event re handling close                
                handleClose();
            }
        } 
        catch (ex){
            console.log(ex);
            this.setState({error: ex.response});       
        }
    }
    render () {
        const { name, inventory, price, imageUrl, description, isActive, onSale,  category} = this.state;
        const { onChange, onSubmit } = this;
        const { action } = this.props;

        return (
            <div>
                <form onSubmit={onSubmit}>
                    <label>
                        Name:
                    </label>
                        <input name='name' value={name || ''} onChange={onChange} />
                    <label>
                        Category:
                    </label>
                    //Need to fix enum 
                    {/* <select value={category} onChange={onChange}>
                        {
                            categories.map(_category => {
                                <option value={_category}>{_category}</option>
                            })
                        }
                    </select> */}
                        {/* <select value={category} onChange={onChange}>
                            <option value='Small Pastas'>Small Pastas</option>
                            <option value='Ribbon-Cut'>Ribbon-Cut</option>
                            <option value='Tube-Shaped'>Tube-Shaped</option>
                            <option value='Stuffed'>Stuffed</option>
                        </select> */}
                    <label>
                        Price:
                    </label>
                        <input name='price' value={price || ''} onChange={onChange} />
                    <label>
                        Inventory:
                    </label>
                        <input name='inventory' value={inventory || ''} onChange={onChange} />
                    <label>
                        Description:
                    </label>
                        <textarea rows='10' cols='50' name='description' value={description || ''} onChange={onChange} />
                    <label>
                        Image URL:
                    </label>
                        <textarea rows='10' cols='50' name='imageUrl' value={imageUrl || ''} onChange={onChange} />
                    <label>
                        Active
                    </label>
                        <input type='checkbox' name='isActive' checked={isActive || ''} onChange={onChange} />
                    <label>
                        On Sale
                    </label>
                        <input type='checkbox' name='onSale' checked={onSale || ''} onChange={onChange} />
                    <br/>
                    <button>{action === 'edit' ? "Edit Product" : "Add Product"}</button>
                </form>
            </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
        categories: state.products.reduce((accum, product) => {
            if (!accum.includes(product.category)) accum.push(product.category);
            return accum;
        },[])
    }
}
const mapDispatch = (dispatch) => {
    return {
        editProduct: (product, history) => dispatch(editProduct(product, history)),
        addProduct: (product, history) => dispatch(addProduct(product, history))
    }
}

export default connect(mapState, mapDispatch)(AdminProductForm)
