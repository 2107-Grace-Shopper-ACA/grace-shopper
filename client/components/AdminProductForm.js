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
            categoryId: '',
            error: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentDidMount(){
        if (this.props.action === 'edit'){
            const { name, inventory, price, description, imageUrl, categoryId } = this.props.product;
            this.setState({name, inventory, price, description, imageUrl, categoryId});
        }
    }

    onChange(ev) {
        const change = {};
        change[ev.target.name] = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
        this.setState(change);
    }

    async onSubmit(ev){
        ev.preventDefault();
        const { name, inventory, price, imageUrl, description, isActive, onSale,  categoryId} = this.state;
        const { history, handleClose, action, editProduct, addProduct, product } = this.props;
        try{
            if(action === 'edit'){
                await editProduct({...product, name, inventory, price, imageUrl, description, isActive, onSale,  categoryId}, history);
            } else {
                await addProduct({name, inventory, price, imageUrl, description, isActive, onSale,  categoryId}, history);
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
        const { name, inventory, price, imageUrl, description, isActive, onSale,  categoryId} = this.state;
        const { onChange, onSubmit } = this;
        const { action, categories } = this.props;

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
                    <select value={categoryId} onChange={onChange}>
                        {
                            categories.map(category => {
                                <option key={category.id} value={category.id}>{category.name}</option>
                            })
                        }
                    </select>
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
        categories: state.categories
    }
}
const mapDispatch = (dispatch) => {
    return {
        editProduct: (product, history) => dispatch(editProduct(product, history)),
        addProduct: (product, history) => dispatch(addProduct(product, history))
    }
}

export default connect(mapState, mapDispatch)(AdminProductForm)
