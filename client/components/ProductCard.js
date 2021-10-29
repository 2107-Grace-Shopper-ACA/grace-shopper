import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
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
import { createTheme, ThemeProvider, shadows } from '@material-ui/core'

const ProductCard = ({
  product,
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

  const theme = createTheme({
    palette: {
      primary: {
        main: '#00fc62',
      },
      secondary: {
        light: '#ff2c61',
        main: '#ff45cd',
      },
    },
    select: {
      '&:before': {
        color: 'black',
      },
      '&:after': {
        color: 'black',
      },
    },
    icon: {
      fill: 'black',
      color: 'white',
    },
  })

  if (!product) return '...loading'

  return (
    //TODO: can't get them to be same height
    <div>
      <Card
        key={product.id}
        height="50%"
        theme={theme}
        style={{
          alignItems: 'stretch',
          background: '#000000',
        }}
      >
        <CardActionArea>
          <Link to={`/products/${product.id}`}>
            <CardMedia
              component="img"
              height="200"
              image={product.imageUrl || 'https://i.gifer.com/MNu.gif'}
              alt="product image"
            />
          </Link>
        </CardActionArea>
        <CardContent
          align="center"
          style={{
            color: 'white',
          }}
        >
          <Link to={`/products/${product.id}`}>
            <Typography
              variant="h5"
              component="div"
              style={{
                color: 'white',
                background: 'linear-gradient(45deg, #ff820d, #f21f2a)',
                borderRadius: 10,
                boxShadow: '0 0px 3px 3px #c7570c',
              }}
            >
              {product.name}
            </Typography>
          </Link>
          <hr></hr>
          <Typography
            variant="body1"
            style={{
              color: 'white',
              background: 'linear-gradient(45deg, #16f53b, #faef52)',
              borderRadius: 10,
              boxShadow: '0 0px 3px 3px #10b32b',
            }}
          >
            ${product.price}
          </Typography>
          <hr></hr>
          {product.inventory < 10 && product.inventory > 0 ? (
            <Typography
              variant="body2"
              style={{
                color: 'white',
                background: 'linear-gradient(45deg, #f44af7, #f74a95)',
                borderRadius: 10,
                boxShadow: '0 0px 3px 3px #b0377b',
              }}
            >
              Only {product.inventory} left in stock!
            </Typography>
          ) : !product.isActive || product.inventory <= 0 ? (
            <Typography
              variant="body2"
              style={{
                color: 'white',
                background: 'linear-gradient(45deg, #f44af7, #f74a95)',
                borderRadius: 10,
                boxShadow: '0 0px 3px 3px #b0377b',
              }}
            >
              Out of stock!
            </Typography>
          ) : (
            <br style={{ margin: '1rem' }}></br>
          )}
        </CardContent>
        <CardActions
          style={{ align: 'center', justifyContent: 'space-around' }}
        >
          <FormControl
            fullWidth
            variant="outlined"
            style={{
              marginBottom: '1rem',
              color: 'white',
              background: 'linear-gradient(45deg, #26b7ff, #28fcdd)',
              borderRadius: 10,
              boxShadow: '0 0px 3px 3px #20c9c9',
              width: '4rem',
            }}
          >
            <Select
              value={quantity || 'Quantity'}
              //label="Quantity"
              name={product.id}
              onChange={(ev) => setQuantity(ev.target.value)}
              style={{ color: 'white' }}
            >
              {Array.from(Array(maxQuantity).keys()).map((idx) => {
                return (
                  <MenuItem key={idx} value={idx + 1}>
                    {idx + 1}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <Button
            theme={theme}
            disabled={quantity === 0}
            variant="outlined"
            style={{
              marginBottom: '1rem',
              background: 'linear-gradient(45deg, #b329f2, #2e35ff)',
              color: 'white',
              boxShadow: '0 0px 3px 3px #1e23b0',
            }}
            onClick={async (ev) => {
              const correctQuantity = (item, product, quantity) => {
                if (quantity + item.quantity > product.inventory) {
                  alert(
                    `Your ${product.name} order quantity exceeds our inventory. We have placed the remaining quantity in your cart.`
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
                    userId: auth.id,
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
            <AddShoppingCart />
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
