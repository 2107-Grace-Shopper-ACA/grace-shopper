import React from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { deleteOrderItem, editOrderItem } from '../store';
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CartAddress from './CartAddress';


  const Cart = ({ orders, orderItems, auth, editOrderItem, deleteOrderItem, user }) => {
    const history = useHistory();
    
    const EmptyCart = () => {
      return (
        <div className="empty-product">
           <h3>There are no products in your cart.</h3>
           <button onClick={() => history.push('/products')}>Show Me The Pasta!</button>
        </div>
      )
    }
    
      let cartOrder = orders.find(order => order.isCart && auth.id ===order.userId) || {};
      let cartItems = orderItems.filter(orderItem => orderItem.orderId === cartOrder.id) || [];
      let localCart = JSON.parse(localStorage.getItem('localCart')) || [];

      if (!auth.id){
        cartItems = localCart || [];
      } 
    
      if((cartItems.length === 0 && localCart.length === 0) ) {
      return (
        <EmptyCart />
        )
      }
      
      let total = cartItems.reduce((accum, item) => {
        accum += item.quantity * item.product.price;
        return accum;
      },0);
      
      const totalItems = cartItems.reduce((accum, item) => {
        accum += item.quantity;
        return accum;
      }, 0);
      
      const tax = .04;

//Prepping items for Stripe PUT request  
  const stripeCartItems = cartItems.map(item => {
    return (
//TODO: need to only send id and quantity for security
      {
        quantity: item.quantity,
        price: +item.product.price * 100,
        name: item.product.name,
        orderItemId: item.id
      }
    )
  });
//
const handleSubmit = async() => {
  fetch("/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Send along all the information about the items
      body: JSON.stringify({
        items: stripeCartItems,
        orderId: cartOrder.id
      }),
    })
      .then(res => {
        if (res.ok) return res.json()
        return res.json().then(e => Promise.reject(e))
      })
      .then(({ url, orderId }) => {
        // On success redirect the customer to the returned URL
        window.location = url;
      })
      .catch(e => {
        console.error(e.error)
      })
}
    
    const onChange = async (ev) => {
      await editOrderItem({id: ev.target.id, quantity: +ev.target.value});
    }
    
    return (
      <Box
        display='flex'
      >
      <Grid className="cart" container style={{margin:'2rem'}} display='flex' direction='column' >
        <header className="container">
        <Typography variant="h5" >{auth.username || "Guest"}'s Shopping Cart <span className="count">({totalItems} items)</span></Typography>
        </header>
        <Typography variant="h6" style={{color: '#8f8a8a', marginLeft: '1.5rem'}}>Order # {cartOrder.id || "Guest"}</Typography>
        {
          cartItems.map(item => (
            <Grid item xs={15} style={{margin: '1rem'}}>
              <Card color="black">
                <Box display='flex'>
                  <CardContent>
                    <CardMedia
                      component="img"
                      style={{height: 100, width: 150}}
                      image={item.product.imageUrl || "https://i.gifer.com/MNu.gif"}
                      alt="product image"
                    />
                    <Typography variant='h6'>
                    {item.product.name}  ({item.quantity})
                      
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant='subtitle1' color="textSecondary">
                    <p>Price:</p>
                    <br></br>
                    <p>${item.product.price}</p>
                    </Typography>
                    <Typography>
                    <br></br>
                    <br></br>
                    <p>Subtotal</p>
                    <hr></hr>
                    <p>${(item.quantity * +item.product.price).toFixed(2)}</p>
                    </Typography>
                  </CardContent>
                  <CardContent>
                  </CardContent>
                  <CardContent>
                    <Typography variant='subtitle2' style={{marginLeft: '1.5rem'}}>
                      Edit
                    </Typography>

                    <div className="quantity" style={{marginBottom: '1rem', marginRight: '1rem'}}>
                      <input
                        type="number"
                        className="quantity"
                        min="1"
                        max={item.product.inventory < 10 ? product.inventory : 10}
                        id={item.id}
                        value={item.quantity}
                        onChange={onChange}
                      />
                    </div>
                    <Button onClick={()=> {deleteOrderItem(item.id)}} color='primary' variant='outlined' size='small'>Delete</Button>
                    </CardContent>
                </Box>
              </Card>
            </Grid>
          ))
        }
      </Grid>
        <Box className="container" style={{marginTop: '1rem', marginRight: '2rem'}}>
          <Typography variant='h6'>
            Subtotal <span>${total.toFixed(2)}</span>
          </Typography>
          <Typography variant='h6'>
            Tax <span>${(total * tax).toFixed(2)}</span>
          </Typography>
          <Typography color='secondary' variant='h6'>
            TOTAL <span>${+total + +(total * tax).toFixed(2)}</span>
          </Typography>
          <div style={{marginTop: '6rem'}}>
            {
              auth.id ?
              <CartAddress history={history}/>
              : 
              <Typography>
                You must be logged in to checkout.
              </Typography>
            }
          </div>
          <div className="checkout">
            <button disabled={!user.streetAddress || !user.city || !user.state || !user.zipcode} onClick={handleSubmit} type="button">Check Out</button>
          </div>
        </Box>
    </Box>
  );
}

const mapDispatch = (dispatch, {history}) => {
  return (
    {
      editOrderItem: (item) => dispatch(editOrderItem(item)),
      deleteOrderItem: (id) => dispatch(deleteOrderItem(id))
    }
  )
}
export default connect((state) => state, mapDispatch)(Cart)
  