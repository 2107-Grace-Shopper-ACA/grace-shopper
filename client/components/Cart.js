import React from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { deleteOrderItem, editOrderItem } from '../store';
import CartAddress from './CartAddress';


import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import { createTheme, ThemeProvider, shadows } from '@material-ui/core'

  const Cart = ({ orders, orderItems, auth, editOrderItem, deleteOrderItem, user }) => {
    const history = useHistory();
    const useStyles = makeStyles((theme) => ({
      root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
      },
      inline: {
        display: 'inline',
      },
    }));

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

    const classes = useStyles();
    return (
      <Box
        display='flex'
      >
      <Grid className="cart" container style={{margin:'2rem'}} display='flex' direction='column' >
        
        <Typography 
          variant="h5" 
          component='div'
          style={{
            color: 'white',
            textAlign: 'center',
            padding: '1rem',
            marginBottom: 0
          }} 
        >
          {auth.username || "Guest"}'s Shopping Cart <span className="count">({totalItems} items)</span>
        </Typography>
        
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: 'black',
            borderRadius: 10,
            boxShadow: '0 0px 7px 7px #ffffff',
          }}
        >
          <Typography 
            variant="h6" 
            style={{
              color: 'darkslategrey',
              background: 'linear-gradient(45deg, #26b7ff, #28fcdd)',
              borderRadius: 5,
              textAlign: 'center',
              marginBottom: '.5rem'
            }}
          >
            Order # {cartOrder.id || "Guest"}
          </Typography>
        {
          cartItems.map(item => (
            <>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: 'black',
                
              }}
            >
              <div
                style={{
                  margin: '1rem'
                }}
              >
                <Typography
                  style={{
                    color: 'slategrey'
                  }}
                >
                  ID# {item.id}
                </Typography>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <img 
                    src={item.product.imageUrl}
                    alt='product image'
                    style={{
                      maxWidth: '130px',
                      border: '1px solid white',
                      borderRadius: 10,
                      boxShadow: '0 0px 3px 3px #20c9c9',
                      marginBottom: '.5rem',
                      marginLeft: '1rem'
                    }}
                  />
                  <br></br>
                  <Typography
                    style={{
                      marginLeft: '1rem'
                    }}
                  >
                    {item.product.name}
                  </Typography>
                  <br></br>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography>
                      Price:
                    </Typography>
                    <Typography>
                      ${item.product.price}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography>
                      Quantity: 
                    </Typography>
                    <Typography>
                    {+item.quantity}
                    </Typography>
                  </div>
                  <hr color='black'></hr>
                  <hr color='black'></hr>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography>
                      Subtotal: 
                    </Typography>
                    <Typography>
                      ${(item.product.price * +item.quantity).toFixed(2)}
                    </Typography>
                  </div>
                </div>
                <div>
                  <Typography 
                    variant='subtitle2' 
                    style={{
                      marginLeft: '.5rem',
                      color: '#26b7ff'
                    }}
                  >
                      Edit
                  </Typography>
                  <div className="quantity" style={{marginBottom: '1rem', marginRight: '1rem'}}>
                    <input
                      type="number"
                      className="quantity"
                      min="1"
                      max={item.product.inventory < 10 ? item.product.inventory : 10}
                      id={item.id}
                      value={item.quantity}
                      onChange={onChange}
                    />
                  </div>
                  <div style={{marginRight: '2rem'}}>
                  <Button onClick={()=>{deleteOrderItem(item.id)}} color='secondary' variant='outlined' size='small'>
                    Delete
                  </Button>
                  </div>
                </div>
              </div>
            </div>
            <Divider 
              style={{
                color: 'white',
                borderRadius: 5,
                boxShadow: '0 0px 7px 7px #ffffff',
              }}
            />
            </>
          ))
        }
        </div>
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
  