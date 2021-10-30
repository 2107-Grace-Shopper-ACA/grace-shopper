import React, { Component } from 'react'
import {connect} from 'react-redux'
import { StyledTextField } from './StyledMUIComponents';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
                await addProduct({name, inventory: inventory ? inventory : 100, price: price ? price : 8.00, imageUrl, description, isActive, onSale,  categoryId}, history);            
            }
            handleClose();
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
          
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                backgroundColor: 'black'
            }}
            noValidate
            autoComplete="off"
            >
                <div 
                    style={{
                        display: 'flex', 
                        flexDirection: 'column', 
                        borderRadius: 10,
                        boxShadow: '0 0px 7px 7px #ffffff',
                        padding: '1rem',
                        margin: '1rem',
                    }}
                >
                    <StyledTextField name='name' value={name || ''} label='Name' onChange={onChange}/>
                    <InputLabel variant="outlined" style={{color: "#ff2c61"}}>
                    Category
                    </InputLabel>
                    <Select
                    value={categoryId || ''}
                    label="Category"
                    name='categoryId'
                    onChange={onChange}
                    style={{color: "white"}}
                    >
                    {categories.map((category) => {
                        return (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                        )
                    })}
                    </Select>
                    <StyledTextField name='price' value={price || ''} label='Price' onChange={onChange} />
                    <StyledTextField name='inventory' value={inventory || ''} label='Inventory' onChange={onChange} />
                    <StyledTextField multiline maxRows={10} name='description' value={description || ''} label='Description' onChange={onChange} />
                    <StyledTextField multiline maxRows={10} name='imageUrl' value={imageUrl || ''} label='Image URL' onChange={onChange} />
                    <FormControlLabel
                        control={
                            <Checkbox 
                                name='isActive' 
                                checked={isActive || ''} 
                                onChange={onChange}
                                style={{color: 'white'}}
                            />
                        }
                        style={{marginLeft: '1rem', color: '#ff2c61'}}
                        label='Is Active'
                    />
                    <FormControlLabel
                        control={
                            <Checkbox 
                                name='onSale' 
                                checked={onSale || ''} 
                                onChange={onChange}
                                style={{color: 'white'}}
                            />
                        }
                        style={{marginLeft: '1rem', color: '#ff2c61'}}
                        label='On Sale'
                    />
                    <Button disabled={!categoryId || !name} 
                        style={{
                            borderRadius: 10,
                            background: 'linear-gradient(45deg, #ff2c61, #ff6c61)',
                            color: 'white',
                            boxShadow: '0 0px 3px 3px #1e23b0',
                        }} 
                        onClick={onSubmit}
                    >
                        {action === 'edit' ? 'Edit Product' : 'Add Product'}
                    </Button>
                </div>
            </Box>
                
            
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
