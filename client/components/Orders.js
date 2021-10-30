import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { loadOrders } from "../store";


const Orders = ({ orders, auth, loadOrders }) => {
  useEffect(()=> {
    loadOrders()
  }, [])

  const [rating, setRating] = useState(2.5);
  orders = orders.filter(order => !order.isCart && order.orderItems.length > 0);

  
  return ( 
    <div id="order-gallery">
      <Link to={"/home"}><h4>Back</h4></Link> 
      {
        orders.map( order => (
          <Box
            display='flex'
            flexDirection='column'
            style={{
              background: 'black',
              borderRadius: 10,
              boxShadow: '0 0px 7px 7px #ffffff',
              width: 600,
              margin: '.5rem 2rem 0 2rem',
            }}
          >
            <Typography 
              variant="h6"
              style={{
                color: 'black',
                background: 'linear-gradient(45deg, #26b7ff, #28fcdd)',
                borderRadius: 5,
                textAlign: 'center',
                marginBottom: '.5rem'
              }}
            >
              Order # {order.id}
            </Typography>
            
            <div
              style={{
                marginLeft: '1rem',
                
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              <Typography variant='subtitle1' color='secondary' 
              >
                Date Ordered:  {order.date.slice(0, order.date.indexOf('T'))}
              </Typography>
              <Typography color='secondary'>
                Total:  ${(order.orderItems.reduce((accum, item) => {
                  accum += item.product.price * +item.quantity;
                  return accum;
                }, 0)).toFixed(2)}
              </Typography>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <Divider 
                style={{
                  borderRadius: 1,
                  boxShadow: '0 0px 4px 2px #ffffff',
                  margin: '.25rem',
                  marginTop: 0
                }}
              />
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginBottom: '.25rem'
                }}
                >
                  <div>
                <Typography
                  style={{
                    marginLeft: '1rem',
                    
                    color: 'white'
                  }}
                  >
                  Product
                </Typography>
                </div>
                  <Typography style={{color: 'white'}}>
                    Quantity
                  </Typography>
                  <Typography style={{color: 'white'}}>
                    Price
                  </Typography>
                  <Typography style={{fontWeight: 'bold', color: 'secondary'}}>
                    Subtotal
                  </Typography>
              </Box>
              <Divider 
                style={{
                  borderRadius: 1,
                  boxShadow: '0 0px 4px 2px #ffffff',
                  margin: '.25rem',
                  marginTop: 0
                }}
              />
              {
                order.orderItems.map(item => (
                <>
                <Box
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginBottom: '.5rem',
                  marginTop: '.5rem'

                }}
                >
                  <div style={{display: 'flex'}}>
                <Avatar alt={item.product.name + ' image'} src={item.product.imageUrl} 
                  style={{
                    boxShadow: '0 0px 3px 3px #20c9c9',
                    marginLeft: '1rem',
                    
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
                </div>
                
                  <Typography style={{color: 'white', textAlign: 'center'}}>
                    {item.quantity}
                  </Typography>
                
                
                  <Typography style={{color: 'white', textAlign: 'center'}}>
                    ${item.product.price}
                  </Typography>
                
                
                  <Typography style={{color: 'white', textAlign: 'center'}}>
                    ${(item.product.price * +item.quantity).toFixed(2)}
                  </Typography>
                
              </Box>
              </>
              ))}
            </div>
      </Box>
      ))
    }
    </div>
  );
};

const mapDispatch = dispatch => (
  {
    loadOrders: () => dispatch(loadOrders())
  }
)
export default connect((state) => state, mapDispatch)(Orders);
