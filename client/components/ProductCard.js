import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { useHistory } from "react-router";
import {createOrder, createOrderItem, editOrderItem} from '../store'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import AddShoppingCart from '@material-ui/icons/AddShoppingCart'


const ProductCard = ({product, style, auth, orders, orderItems, createOrder, createOrderItem, editOrderItem}) => {
    const history = useHistory();

    const [quantity, setQuantity] = useState(0);
    const maxQuantity = product.inventory < 10 ? product.inventory : 10;

    let cartOrder = orders.find(order => order.isCart && order.userId === auth.id);
    let cartItems = orderItems.filter(item => item.orderId === cartOrder.id);

    if (!product) return '...loading'

    return (
//TODO: can't get them to be same height
        <div height='500px'>
        <Card height='100%' style={{...style, alignItems: 'stretch', backgroundColor: 'lightgray'}} 
            
            >
            <CardActionArea onClick={()=>history.push(`/products/${product.id}`)}>
                <CardMedia
                    component="img"
                    height="200"
                    image={product.imageUrl || "https://i.gifer.com/MNu.gif"}
                    alt="product image"
                />
                <CardContent>
                    <Typography variant="h5" component="div">
                    {product.name}
                    </Typography>
                    <hr></hr>
 {/* //TODO: wrap text so same height                   */}
                    <Typography variant="body2" component="div" color="text.secondary">
                    {product.description}
                    </Typography>
                    <hr></hr>
                    <Typography variant="body1" color="primary">
                    ${product.price}
                    </Typography>
                    {
                        product.inventory < 10 ? 
                        <Typography variant="body2" color="secondary">
                        Only {product.inventory} left in stock!
                        </Typography> 
                        : <br></br>
                    }
                    <hr></hr>
                </CardContent>
            </CardActionArea >
            <CardActions>
            <FormControl fullWidth style={{marginBottom: '3rem'}}>
                {/* <div className="quantity" >
                    <input
                    type="number"
                    className="quantity"
                    defaultValue="1"
                    min="1"
                    max={maxQuantity}
                    name={product.id}
                    value={quantity || 1}
                    onChange={(ev) => setQuantity(ev.target.value)}
                    />
                </div> */}
                <InputLabel variant='body5' color='textPrimary'>
                    Quantity:
                </InputLabel>
                <Select
                value={ quantity || ''}
                label="Quantity"
                name={product.id}
                onChange={(ev)=>setQuantity(ev.target.value)}
                >
                {
                    Array.from(Array(maxQuantity).keys()).map(idx => {
                        return (
                            <MenuItem value={idx + 1}>{idx + 1}</MenuItem>
                        )
                    })
                }
                </Select>
            </FormControl>
                <Button disabled={quantity === 0} color='primary' variant='outlined' style={{marginBottom: '3rem'}}
                    onClick={
                    async (ev) => {
                        // let cartOrder = orders.find(order => (order.userId === auth.id) && order.isCart)
                        
                        //If there is an order that is the cart...
                        if(cartOrder){
                            let orderItem = cartItems.find(orderItem => orderItem.productId === product.id );
                        
                        //If there is an orderItem in the cart that matches the orderItem we're trying to add...
                        if(orderItem){
            //check to see if inventory will allow
                            if  ((quantity + orderItem.quantity) > product.inventory){
            //TODO: change alert
                                alert(`Your ${product.name} order quantity exceeds our inventory. YOU WILL GET ${product.inventory} ${product.name} AND YOU'LL LOVE IT!!!!`)
                                await editOrderItem({...orderItem, quantity: product.inventory});
                                } else {
                                await editOrderItem({ id: orderItem.id, quantity: orderItem.quantity + quantity})
                                }
                            //If there ISN'T an orderItem in the cart that matches the orderItem we're trying to add...
                        } else {
                            if  (quantity > product.inventory){
            //TODO: change alert
                            alert(`Your ${product.name} order quantity exceeds our inventory. YOU WILL GET ${product.inventory} ${product.name} AND YOU'LL LOVE IT!!!!`)
                            await createOrderItem({orderId: cartOrder.id, productId: product.id, quantity: product.inventory, userId: auth.id});
                            } else {
                            await createOrderItem({ orderId: cartOrder.id, productId: product.id, quantity, userId: auth.id})
                            }
                        }

                        //If there ISN'T an order that is the cart...
                        } else {
                        cartOrder = await createOrder({userId: auth.id})
                        // console.log(`Cart Order made: ${JSON.stringify(cartOrder)}`)
                        if  (quantity > product.inventory){
        //TODO: change alert
                            alert(`Your ${product.name} order quantity exceeds our inventory. YOU WILL GET ${product.inventory} ${product.name} AND YOU'LL LOVE IT!!!!`)
                            await createOrderItem({orderId: cartOrder.id, productId: product.id, quantity: product.inventory, userId: auth.id});
                        } else {
                            await createOrderItem({ orderId: cartOrder.id, productId: product.id, quantity, userId: auth.id})
                        }
                        } 
                        setQuantity('');
                        }
                    }
                >
                    <AddShoppingCart color='success'/>
                </Button>
            </CardActions>
        </Card>
        </div>
    )
}
const mapState = (state) => {
    return (
        {
            orders: state.orders,
            orderItems: state.orderItems,
            auth: state.auth
        }
    )
}
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
export default connect(mapState, mapDispatchToProps)(ProductCard);
