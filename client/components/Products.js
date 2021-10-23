import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { useHistory } from "react-router";
import {createOrder, createOrderItem, editOrderItem} from '../store'
import {Button, Box, Grid,Typography, CardActionArea, CardActions, CardContent, Card, CardMedia, InputLabel, MenuItem, FormControl, Select} from '@material-ui/core'

const Products = ({ products, orders, auth, orderItems, createOrder, createOrderItem, editOrderItem}) => {
//TODO: only bring in what we need from the store, like we should only bring in products that are active like in the line below -C
  products = products.filter(product => product.isActive).sort((a, b) => {return a.name < b.name ? -1 : 1});
//TODO: we can change the logic below now that a cart order is created after someone makes a sale
const history = useHistory();



return (
  <div id="product-gallery">

<Grid container spacing={4}  direction='row' >
    {
        products.map(product => {
          const [quantity, setQuantity] = useState(0);
          
            return (
                <Grid key={product.id} item xs={7} sm={4} style={{key:`${product.id}`}}>
                <Card style={{backgroundColor: 'lightgray'}} 
                  sx={{ maxWidth: 300, maxHeight: 200}} 
                  >
                    <CardActionArea onClick={()=>history.push(`/products/${product.id}`)}>
                        <CardMedia
                            component="img"
                            height="80"
                            image={product.imageUrl || "https://i.gifer.com/MNu.gif"}
                            alt="product image"
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                            {product.name}
                            </Typography>
                            <hr></hr>
                            <Typography variant="body1" color="text.primary">
                            ${product.price}
                            </Typography>
                            <hr></hr>
                        </CardContent>
                    </CardActionArea >
                    <CardActions>
                    <FormControl fullWidth>
                      <InputLabel >Quantity</InputLabel>
                      <Select
                        value={ quantity || ''}
                        label="Quantity"
                        name={product.id}
                        onChange={(ev)=>setQuantity(ev.target.value)}
                      >
                        {
                          [1,2,3,4,5,6,7,8,9,10].map(idx => {
                            return (
                              <MenuItem value={idx}>{idx}</MenuItem>
                            )
                          })
                        }
                      </Select>
                    </FormControl>
                        <Button color='primary' variant='contained' 
                          onClick={
                            async (ev) => {
                              let cartOrder = orders.find(order => (order.userId === auth.id) && order.isCart)
                              
                              //If there is an order that is the cart...
                              if(cartOrder){
                                const orderItem = orderItems.find(orderItem => (orderItem.productId === product.id && orderItem.orderId === cartOrder.id))
                                
                                //If there is an orderItem in the cart that matches the orderItem we're trying to add...
                                if(orderItem){
                  //check to see if inventory will allow
                                  if  ((quantity + orderItem.quantity) > product.inventory){
                  //TODO: change alert
                                        alert(`Your ${product.name} order quantity exceeds our inventory. YOU WILL GET ${product.inventory} ${product.name} AND YOU'LL LOVE IT!!!!`)
                                        editOrderItem({...orderItem, quantity: product.inventory});
                                      } else {
                                        editOrderItem({ id: orderItem.id, quantity: orderItem.quantity + quantity})
                                      }
                                  //If there ISN'T an orderItem in the cart that matches the orderItem we're trying to add...
                                } else {
                                  if  (quantity > product.inventory){
                  //TODO: change alert
                                    alert(`Your ${product.name} order quantity exceeds our inventory. YOU WILL GET ${product.inventory} ${product.name} AND YOU'LL LOVE IT!!!!`)
                                    createOrderItem({orderId: cartOrder.id, productId: product.id, quantity: product.inventory, userId: auth.id});
                                  } else {
                                    createOrderItem({ orderId: cartOrder.id, productId: product.id, quantity, userId: auth.id})
                                  }
                                }
                
                                //If there ISN'T an order that is the cart...
                              } else {
                                cartOrder = await createOrder({userId: auth.id})
                                console.log(`Cart Order made: ${JSON.stringify(cartOrder)}`)
                                if  (quantity > product.inventory){
                //TODO: change alert
                                  alert(`Your ${product.name} order quantity exceeds our inventory. YOU WILL GET ${product.inventory} ${product.name} AND YOU'LL LOVE IT!!!!`)
                                  createOrderItem({orderId: cartOrder.id, productId: product.id, quantity: product.inventory, userId: auth.id});
                                } else {
                                  createOrderItem({ orderId: cartOrder.id, productId: product.id, quantity, userId: auth.id})
                                }
                              } 
                              setQuantity('');
                              }
                          }
                        >
                            Purchase
                        </Button>
                    </CardActions>
                </Card>
                </Grid>
            );
        })
    }
    </Grid>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: (user) => {
      dispatch(createOrder(user))
    },
    createOrderItem: (product) => {
      console.log(`product object: ${JSON.stringify(product)}`)
      dispatch(createOrderItem(product))
    },
    editOrderItem: (orderItem) => {
      dispatch(editOrderItem(orderItem))
    }
  }
}

export default connect((state) => state, mapDispatchToProps)(Products);
