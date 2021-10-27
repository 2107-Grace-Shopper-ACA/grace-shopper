import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { createOrder, createOrderItem, editOrderItem, update } from '../store'
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
import { withStyles } from '@material-ui/core/styles'

const ProductCard = ({
  product,
  style,
  auth,
  orders,
  orderItems,
  update,
  createOrderItem,
  editOrderItem,
}) => {
  const history = useHistory()

  const [quantity, setQuantity] = useState(0)
  const maxQuantity = product.inventory < 10 ? product.inventory : 10

  let cartOrder =
    orders.find((order) => order.isCart && order.userId === auth.id) || {}
  let cartItems =
    orderItems.filter((item) => item.orderId === cartOrder.id) || []

  const GreenTextTypography = withStyles({
    root: {
      color: 'linear-gradient(45deg, #00fc62, #00ffee)',
    },
  })(Typography)

  if (!product) return '...loading'

  return (
    //TODO: can't get them to be same height
    <div height="500px">
      <Card
        key={product.id}
        height="100%"
        style={{
          ...style,
          alignItems: 'stretch',
          backgroundColor: 'black',
          borderColor: 'white',
          color: 'white',
        }}
      >
        <CardActionArea onClick={() => history.push(`/products/${product.id}`)}>
          <CardMedia
            component="img"
            height="200"
            image={product.imageUrl || 'https://i.gifer.com/MNu.gif'}
            alt="product image"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {product.name}
            </Typography>
            <hr></hr>
            {/* //TODO: wrap text so same height                   */}
            <Typography variant="body2" component="div" color="textSecondary">
              {product.description}
            </Typography>
            <hr></hr>
            <GreenTextTypography variant="body1">
              ${product.price}
            </GreenTextTypography>
            {product.inventory < 10 ? (
              <Typography variant="body2" color="secondary">
                Only {product.inventory} left in stock!
              </Typography>
            ) : (
              <br></br>
            )}
            <hr></hr>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <FormControl fullWidth style={{ marginBottom: '3rem' }}>
            <InputLabel variant="body5" color="primary">
              Quantity:
            </InputLabel>
            <Select
              value={quantity || ''}
              label="Quantity"
              name={product.id}
              onChange={(ev) => setQuantity(ev.target.value)}
            >
              {Array.from(Array(maxQuantity).keys()).map((idx) => {
                return <MenuItem key={idx} value={idx + 1}>{idx + 1}</MenuItem>
              })}
            </Select>
          </FormControl>
          <Button
            disabled={quantity === 0}
            color="primary"
            variant="outlined"
            style={{ marginBottom: '3rem' }}
            onClick={async (ev) => {
              const correctQuantity = (item, product, quantity) => {
                if (quantity + item.quantity > product.inventory) {
                  alert(
                    `Your ${product.name} order quantity exceeds our inventory. YOU WILL GET ${product.inventory} ${product.name} AND YOU'LL LOVE IT!!!!`
                  )
                  return product.inventory
                } else {
                  return quantity + item.quantity
                }
              }

              //if it is a guest
              if (!auth.id) {
                let localCart
                //if there's no localCart create one and add item to it
                if (!localStorage.getItem('localCart')) {
                  localCart = [
                    {
                      id: product.id,
                      product,
                      quantity: correctQuantity(
                        { quantity: 0 },
                        product,
                        quantity
                      ),
                    },
                  ]
                } else {
                  //if there is a localCart
                  localCart = JSON.parse(localStorage.getItem('localCart'))
                  //if there's nothing in the cart
                  if (localCart.length === 0) {
                    localCart.push({ id: product.id, product, quantity })
                  } else {
                    //if there are items in the cart, see if one is for the same product
                    const thisItem = localCart.find(
                      (item) => item.id === product.id
                    )
                    if (thisItem) {
                      thisItem.quantity = correctQuantity(
                        thisItem,
                        product,
                        quantity
                      )
                    } else {
                      //if not already in cart, add a new item
                      localCart.push({ id: product.id, product, quantity })
                    }
                  }
                }
                //add localCart to localStorage and reset quantity
                localStorage.setItem('localCart', JSON.stringify(localCart))
                setQuantity(0)
              }
              //it is a user and will definitely have a cart order
              else {
                //if order item is already in cart, edit order item quantity
                let orderItem = cartItems.find(
                  (orderItem) => orderItem.productId === product.id
                )
                if (orderItem) {
                  await editOrderItem({
                    ...orderItem,
                    quantity: correctQuantity(orderItem, product, quantity),
                  })
                }
                //if not in cart create new order item
                else {
                  await createOrderItem({
                    orderId: cartOrder.id,
                    productId: product.id,
                    quantity: correctQuantity(
                      { quantity: 0 },
                      product,
                      quantity
                    ),
                  })
                }
                setQuantity(0)
              }
              update(Math.random())
            }}
          >
            <AddShoppingCart color="success" />
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}
const mapState = (state) => {
  return {
    orders: state.orders,
    orderItems: state.orderItems,
    auth: state.auth,
  }
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
    },
    update: (num) => {
      dispatch(update(num))
    },
  }
}
export default connect(mapState, mapDispatchToProps)(ProductCard)
