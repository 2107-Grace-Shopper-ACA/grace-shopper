import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import Box from '@material-ui/core/Box'
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


const Orders = ({ orders }) => {
  
  return (  
    <div id="order-gallery">
      {orders.filter(order => !order.isCart).map((order) => {
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
          </Card>
        );
      })}
    <Link to={"/home"}><h4>Back</h4></Link>
    </div>
  );
};


export default connect((state) => state)(Orders);
