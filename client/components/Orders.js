import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Card from '@material-ui/core/Card'
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import Rating from 'material-ui-rating';
import { loadOrders } from "../store";


const Orders = ({ orders, auth }) => {
  useEffect(()=> {
    loadOrders()
  }, [])
  const [rating, setRating] = useState(2.5);
  orders = orders.filter(order => {
    // console.log(Date.UTC(order.date));
    // console.log(Date.toUTCString(order.date));
    return !order.isCart});

  
  return (  
    <div id="order-gallery">
      <Grid className="cart" container style={{margin:'2rem'}} display='flex' direction='column' xs={7} >
        <header className="container">
        <Typography variant="h5" >{auth.username}'s Previous Orders <span className="count">({orders.length})</span></Typography>
        </header>
        {
          orders.map(order => (
            <>
            <Grid item style={{margin: '1rem', key: order.id}} xs>
              <Card>
              <Typography variant="h6" >Order Date: {order.date}</Typography>
              <Typography variant='subtitle1'>
                    Order ID: {order.id}
              </Typography>
              <hr></hr>
                <Box display='flex' >
                  <CardContent>
                    <CardMedia
                      component="img"
                      height={100}
                      image={"https://thumbs.gfycat.com/WavyQuerulousBordercollie.webp"}
                      alt="product image"
                    />
                    <Button variant='outlined' color='secondary' style={{marginTop: "1rem"}}>
                      Feedback?<LiveHelpIcon />
                    </Button>
                    <br></br>
{/* //TODO: ADD FUNCTIONALITY                     */}
                    <Rating
                      size='small'
                      name="rating"
                      defaultValue={2.5}
                      precision={0.5}
                      max={4}
                      value={rating}
                      onChange={(event, newValue) => {
                        setRating(newValue);
                      }}
                    />
                  </CardContent>
                  <CardContent>
                    <Typography variant='subtitle1'>
                    Products
                    <hr></hr>
                    </Typography>
                    {
                      order.orderItems.map(item => {
                        return (
                          <Typography key={item.id} variant='subtitle1' color="textSecondary">
                          <Link className='link-on-white' to={`/products/${item.productId}`}> {item.product.name} </Link>
                          </Typography>
                        )
                      })
                    }
                  </CardContent>
                  <CardContent>
                  <Typography variant='subtitle1'>
                    Price
                    <hr></hr>
                    </Typography>
                    {
                      order.orderItems.map(item => {
                        return (
                          <Typography key={item.id} variant='subtitle1' color="textSecondary">
                          {item.product.price}: 
                          </Typography>
                        )
                      })
                    }
                  <Typography variant='subtitle1'>
                    <hr></hr>
                    ${order.orderItems.reduce((accu, cur) => accu + cur.quantity*cur.product.price, 0).toFixed(2)}
                    </Typography>
                  </CardContent>
                  <CardContent>
                  <Typography variant='subtitle1'>
                    Quantity
                    <hr></hr>
                    </Typography>
                    {
                      order.orderItems.map(item => {
                        return (
                          <Typography variant='subtitle1' color="textSecondary">
                          {item.quantity}
                          </Typography>
                        )
                      })
                    }
                    <Typography variant='subtitle1'>
                    <hr></hr>
                    {order.orderItems.reduce((accu, cur) => accu + cur.quantity, 0)}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant='subtitle1'>
                    TODO: STATUS
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
            </>
          ))
        }
        </Grid>
      {/* {orders.filter(order => !order.isCart).map((order) => {
        return (
          <Card sx={{ display: 'flex', key: `${order.id}` }}>
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
              <Typography component="div" variant="h5">
                  Order Placed {order.date}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                Quantity: {order.orderItems.reduce((accu, cur) => accu + cur.quantity, 0)}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                Total: ${order.orderItems.reduce((accu, cur) => accu + cur.quantity*cur.product.price, 0)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography component="div" variant="h5">
                  Order Placed {order.date}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  Quantity: {order.orderItems.reduce((accu, cur) => accu + cur.quantity, 0)}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  Total: ${order.orderItems.reduce((accu, cur) => accu + cur.quantity*cur.product.price, 0)}
                </Typography>
              </CardContent>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                sx={{ width: 20 }}
                image="https://i.gifer.com/MNu.gif"
                alt="gif of tasty pasta"
              />
            </Box>
          </Card> */}
        {/* );
      })} */}
    <Link to={"/home"}><h4>Back</h4></Link>
    </div>
  );
};

const mapDispatch = dispatch => (
  {
    loadOrders: () => dispatch(loadOrders())
  }
)
export default connect((state) => state)(Orders);
