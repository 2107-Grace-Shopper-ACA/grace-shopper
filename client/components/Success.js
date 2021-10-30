import React, {useState} from 'react'
import {connect} from 'react-redux'
import { useHistory } from 'react-router'
import { editOrder, createOrder, editProduct } from '../store'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

/**
 * COMPONENT
 */
const Success = ({auth, order, editOrder, createOrder, orderItems, editProduct, products}) => {
    const [rating, setRating] = useState(2.5)
    const history = useHistory();
    
    products = products.filter(product => {
        for (let item of orderItems){
            if(item.productId === product.id) return true
        }
    }).sort((a,b) => a.id < b.id);
    
    const newInventory = products.map(product => {
        for (let item of orderItems){
            if(item.productId === product.id) {
                return product.inventory - item.quantity;
            }
        }
    });

    const handleClick = async() => {
      //edit order's date to be when the transaction went through and change isCart status
      //update each product's inventory and if it's zero make it inactive
        await Promise.all([
          editOrder({...order, date: new Date(), isCart: false}),
          createOrder({userId: auth.id, isCart: true}),
          ...products.map((product, idx) => {
            if (newInventory[idx] > 0){
                editProduct({...product, inventory: newInventory[idx]});
            } else {
                editProduct({...product, inventory: newInventory[idx], isActive: false});
            }
        })
        ]);
        history.push('/orders');
      }

    if (!order) return '...loading'
    
    return (
        <>
        <Box 
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                backgroundColor: 'black',
                borderRadius: 10,
                boxShadow: '0 0px 7px 7px #ffffff',
                padding: '1rem',
                margin: '1rem',
            }}
            display='flex'
            flexDirection='column'
            noValidate
            autoComplete="off"
        >
            <Typography 
                style={{alignSelf: 'center', textAlign: 'center'}}
                variant='h5'
            >Success, {auth.username}! 
            <br></br>
              Your order is complete.</Typography>
            <br></br>
            <Box
           display='flex'
           flexDirection='column'
           style={{
             background: 'black',
             borderRadius: 10,
             boxShadow: '0 0px 7px 7px #ffffff',
             width: '60%',
             alignSelf: 'center'
           }}
         >
           <Typography 
             variant="h6"
             style={{
               color: 'black',
               background: 'linear-gradient(45deg, #26b7ff, #28fcdd)',
               borderRadius: 5,
               textAlign: 'center',
               marginBottom: '.5rem'
             }}
           >
             Order # {order.id}
           </Typography>
           
           <div
             style={{
               marginLeft: '1rem',
               marginBottom: '1rem',
               display: 'flex',
               justifyContent: 'space-around'
             }}
           >
             <Typography variant='subtitle1' color='secondary'
             >
               Date Ordered:  {order.date.slice(0, order.date.indexOf('T'))}
             </Typography>
             <Typography color='secondary' variant='h6'>
               Total:  ${(order.orderItems.reduce((accum, item) => {
                 accum += item.product.price * +item.quantity;
                 return accum;
               }, 0)).toFixed(2)}
             </Typography>
           </div>
           <div
             style={{
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'space-between'
             }}
           >
             <Divider 
               style={{
                 borderRadius: 1,
                 boxShadow: '0 0px 4px 2px #ffffff',
                 margin: '1rem',
                 marginTop: 0
               }}
             />
             <Box
               style={{
                 display: 'flex',
                 flexDirection: 'row',
                 justifyContent: 'space-evenly',
                 marginBottom: '.5rem'
               }}
               >
                 <div>
               <Typography
                 style={{
                   marginLeft: '1rem',
                   marginTop: '.25rem',
                   color: 'white'
                 }}
                 >
                 Product
               </Typography>
               </div>
                 <Typography style={{color: 'white'}}>
                   Quantity
                 </Typography>
                 <Typography style={{color: 'white'}}>
                   Price
                 </Typography>
                 <Typography style={{fontWeight: 'bold', color: 'secondary'}}>
                   Subtotal
                 </Typography>
             </Box>
             <Divider 
               style={{
                 borderRadius: 1,
                 boxShadow: '0 0px 4px 2px #ffffff',
                 margin: '1rem',
                 marginTop: 0
               }}
             />
             {
               order.orderItems.map(item => (
               <>
               <Box
               style={{
                 display: 'flex',
                 flexDirection: 'row',
                 justifyContent: 'space-evenly',
                 marginBottom: '1rem'
               }}
               >
                 <div>
               <Avatar alt={item.product.name + ' image'} src={item.product.imageUrl} 
                 style={{
                   boxShadow: '0 0px 3px 3px #20c9c9',
                   marginLeft: '1rem'
                 }}
                 />
               <Typography
                 style={{
                   marginLeft: '1rem',
                   marginTop: '.25rem',
                   color: 'white'
                 }}
                 >
                 {item.product.name  } 
               </Typography>
               </div>
               
                 <Typography style={{color: 'white', textAlign: 'center'}}>
                   {item.quantity}
                 </Typography>
               
               
                 <Typography style={{color: 'white', textAlign: 'center'}}>
                   ${item.product.price}
                 </Typography>
               
               
                 <Typography style={{color: 'white', textAlign: 'center'}}>
                   ${(item.product.price * +item.quantity).toFixed(2)}
                 </Typography>
               
             </Box>
             </>
             ))}
           </div>
     </Box>
            <Button 
                variant='outlined' 
                color='primary' 
                onClick={handleClick}
                style={{
                    borderRadius: 10,
                    background: 'linear-gradient(45deg, #3523d9, #00d3de)',
                    color: 'white',
                    boxShadow: '0 0px 3px 3px #1e23b0',
                    width: '10%',
                    alignSelf: 'center',
                    marginTop: '2rem'
                }} 
            >
                My Orders
            </Button>
        </Box>
        
   
   </>   
    )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    auth: state.auth,
    order: state.orders.find(order => order.isCart),
    orderItems: state.orderItems.filter(item => item.order.isCart),
    products: state.products
  }
}
const mapDispatch = dispatch => {
    return {
        editOrder: (order) => dispatch(editOrder(order)),
        createOrder: (order) => dispatch(createOrder(order)),
        editProduct: (product) => dispatch(editProduct(product))
    }
}

export default connect(mapState, mapDispatch)(Success)
