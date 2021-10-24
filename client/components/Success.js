import React, {Component, useState} from 'react'
import {connect} from 'react-redux'
import { useHistory } from 'react-router'
import { editOrder, createOrder, editProduct } from '../store'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Card from '@material-ui/core/Card'
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import Rating from 'material-ui-rating';

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
        
        await editOrder({...order, date: new Date(), isCart: false});
        await createOrder({userId: auth.id, isCart: true});
        await Promise.all(products.map((product, idx) => {
            if (newInventory[idx] > 0){
                editProduct({...product, inventory: newInventory[idx]});
            } else {
                editProduct({...product, inventory: newInventory[idx], isActive: false});
            }
        }))
        console.log(order.date);
        history.push('/products');
    }
    
  
    return (
        <div>
            <h3>Success!</h3>
            <h3>Click the Button or Else!</h3>
            <button onClick={handleClick}>BACK TO PASTA</button>
        </div>
//         <div>
//         <h3>Success, {auth.username}!</h3>
//         <button onClick={handleClick}>BACK TO PASTA PEDDLER</button>
//         <Typography variant="h6" style={{color: '#8f8a8a', marginLeft: '1.5rem'}}>Order # {order.id} Was Placed
//         </Typography>
//         <br></br>
//         <Typography variant="h6" style={{color: '#8f8a8a', marginLeft: '1.5rem'}}>
//             Maybe Something Will Happen
//         </Typography>

//         <Grid className="cart" container style={{margin:'2rem'}} display='flex' direction='column' xs={7} >
//               <Card>
//               <Typography variant="h6" >Order Date: {order.date}</Typography>
//               <Typography variant='subtitle1'>
//                     Order ID: {order.id}
//               </Typography>
//               <hr></hr>
//                 <Box display='flex' >
//                   <CardContent>
//                     <CardMedia
//                       component="img"
//                       height={100}
//                       image={"https://i.gifer.com/MNu.gif"}
//                       alt="product image"
//                     />
//                     <Button variant='outlined' color='secondary' style={{marginTop: "1rem"}}>
//                       Questions?<LiveHelpIcon />
//                     </Button>
//                     <br></br>
// {/* //TODO: ADD FUNCTIONALITY                     */}
//                     <Rating
//                       size='small'
//                       name="rating"
//                       defaultValue={2.5}
//                       precision={0.5}
//                       max={4}
//                       value={rating}
//                       onChange={(event, newValue) => {
//                         setRating(newValue);
//                       }}
//                     />
//                     <Button variant='outlined' size='small' color='inherit'>Leave a Review</Button>
//                   </CardContent>
//                   <CardContent>
//                     <Typography variant='subtitle1'>
//                     Products
//                     <hr></hr>
//                     </Typography>
//                     {
//                       order.orderItems.map(item => {
//                         return (
//                           <Typography variant='subtitle1' color="textSecondary">
//                           {item.product.name}: 
//                           </Typography>
//                         )
//                       })
//                     }
//                   </CardContent>
//                   <CardContent>
//                   <Typography variant='subtitle1'>
//                     Price
//                     <hr></hr>
//                     </Typography>
//                     {
//                       order.orderItems.map(item => {
//                         return (
//                           <Typography variant='subtitle1' color="textSecondary">
//                           {item.product.price}: 
//                           </Typography>
//                         )
//                       })
//                     }
//                   <Typography variant='subtitle1'>
//                     <hr></hr>
//                     ${order.orderItems.reduce((accu, cur) => accu + cur.quantity*cur.product.price, 0).toFixed(2)}
//                     </Typography>
//                   </CardContent>
//                   <CardContent>
//                   <Typography variant='subtitle1'>
//                     Quantity
//                     <hr></hr>
//                     </Typography>
//                     {
//                       order.orderItems.map(item => {
//                         return (
//                           <Typography variant='subtitle1' color="textSecondary">
//                           {item.quantity}
//                           </Typography>
//                         )
//                       })
//                     }
//                     <Typography variant='subtitle1'>
//                     <hr></hr>
//                     {order.orderItems.reduce((accu, cur) => accu + cur.quantity, 0)}
//                     </Typography>
//                   </CardContent>
//                   <CardContent>
//                     <Typography variant='subtitle1'>
// //                     TODO: STATUS
//                     </Typography>
//                   </CardContent>
//                 </Box>
//               </Card>
//             </Grid>
//       </div>
    // )
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
