import React from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { deleteOrderItem, editOrderItem } from '../store';
import CartAddress from './CartAddress';


import FormControl from '@material-ui/core/FormControl'
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
        flexDirection='column'
        xs={12}
        sm={10}
      >
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
        <Box
          display='flex'
          justifyContent='space-evenly'
          margin='1rem'
        > 
          <Box
            display='flex'
            flexDirection='column'
            style={{
              background: 'black',
              borderRadius: 10,
              boxShadow: '0 0px 7px 7px #ffffff',
              width: '40%'
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
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'black',
                  marginTop: '1rem',
                }}
              >
                <div
                  style={{
                    marginLeft: '1rem',
                    marginBottom: '1rem'
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
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-evenly',
                      marginBottom: '.5rem'
                    }}
                  >
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
                  </Box>
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-evenly',
                      alignItems: 'flex-end',
                      marginTop: 0
                    }}
                  >
                    <Typography style={{color: 'white'}}>
                      Price: ${item.product.price}
                    </Typography>
                    <Typography style={{fontWeight: 'bold', color: 'secondary'}}>
                      Total: ${(item.product.price * +item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                  <Box display='flex' justifyContent='space-around' style={{ marginRight: '1rem', marginTop: '.5rem'}}>
                    <Box >
                      <input
                        type="number"
                        className="quantity"
                        min="1"
                        max={item.product.inventory < 10 ? item.product.inventory : 10}
                        id={item.id}
                        value={item.quantity}
                        onChange={onChange}
                        style={{
                          marginRight: '2rem',
                          color: 'black',
                          background: 'linear-gradient(45deg, #26b7ff, #28fcdd)',
                          borderRadius: 10,
                          boxShadow: '0 0px 3px 3px #20c9c9',
                          width: '2.5rem',
                        }}
                      />
                    </Box>
                    <div>
                      <Button onClick={() => deleteOrderItem(item.id)} 
                      variant='outlined' 
                      size='small'
                      style={{
                        borderRadius: 10,
                        marginBottom: '1rem',
                        background: 'linear-gradient(45deg, #ff2c61, #ff6c61)',
                        color: 'white',
                        boxShadow: '0 0px 3px 3px #1e23b0',
                      }}>
                        Delete
                      </Button>
                    </div>
                  </Box>
                </div>
              </Box>
              <Divider 
                style={{
                  borderRadius: 7,
                  boxShadow: '0 0px 4px 2px #ffffff',
                }}
              />
              </>
            ))
          }
          <Box style={{
              alignSelf: 'end',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              marginRight: '1rem',
              marginTop: '1rem',
            }}
          >
            <Typography variant='h6'>
              Subtotal:  <span>${total.toFixed(2)}</span>
            </Typography>
            <Typography variant='h6'>
              Tax:  <span>${(total * tax).toFixed(2)}</span>
            </Typography>
            <Typography color='secondary' variant='h6'>
              TOTAL:  <span>${(+total + (+total * +tax)).toFixed(2)}</span>
            </Typography>
          </Box>
        </Box>
        <Box 
          display="flex" 
          flexDirection='column'
          style={{
            width: '40%'
          }}>
          <Box style={{
              margin: '2rem'
            }}
          >
            {
              auth.id ?
              <CartAddress history={history}/>
              : 
              <Typography>
                You must be logged in to checkout.
              </Typography>
            }
          </Box>
          <div className="checkout">
            <Button 
              disabled={!user.streetAddress || !user.city || !user.state || !user.zipcode} 
              onClick={handleSubmit} 
              style={{
                background: 'linear-gradient(45deg, #15c7d4, #07ab1d)',
                color: 'white',
                boxShadow: '0 0px 3px 3px #0c9ea8',
              }}
            >
              Check Out
            </Button>
          </div>
        </Box>
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
  