import React, {useState} from 'react'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { deleteOrderItem, editOrderItem,loadOrderItems } from '../store';
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
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

  const Cart = ({ orders, orderItems, auth, editOrderItem, deleteOrderItem, loadOrderItems }) => {
    const history = useHistory();

    const EmptyCart = () => {
      return (
        <div className="empty-product">
           <h3>There are no products in your cart.</h3>
           <button onClick={() => history.push('/products')}>Show Me The Pasta!</button>
        </div>
      )
    }
    
    if(orders.length === 0 || orderItems.length === 0) {
      return (
        <EmptyCart />
        )
      }
      
      let cartOrder = orders.find(order => order.isCart && auth.id ===order.userId);
      let cartItems = orderItems.filter(orderItem => orderItem.orderId === cartOrder.id);
      
      if(cartItems.length === 0) {
        return (
          <EmptyCart />
          )
        }
      
      useEffect(() => {
        loadOrderItems()
      }, [cartItems.length])
    
    let total = cartItems.reduce((accum, item) => {
      accum += item.quantity * item.product.price;
      return accum;
    },0);

    const totalItems = cartItems.reduce((accum, item) => {
      accum += item.quantity;
      return accum;
    }, 0);

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
    
    const tax = .04;
    
    const onChange = async (ev) => {
      ev.target.quantity === 0 ? 
        await deleteOrderItem(ev.target.name) :
        await editOrderItem({id: ev.target.name, quantity: ev.target.value});
    }
    const onClick = async (ev) => {
      console.log(ev.target)
      await deleteOrderItem(ev.target.value);
    }

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
          .then(({ url }) => {
            // On success redirect the customer to the returned URL
            window.location = url
          })
          .catch(e => {
            console.error(e.error)
          })
  }

    return (
      <>
      <Grid className="cart" container style={{margin:'2rem'}} display='flex' direction='column' xl={12} xs={12} lg={12} md={12} spacing={2} >
        <header className="container">
        <Typography variant="h5" >Shopping Cart <span className="count">{totalItems} items in your cart</span></Typography>
        </header>
        {
          cartItems.map(item => (
            <Grid item xs={12} xl={10} lg={8} md={6}>
              <Card>
                <Box display='flex' >
                  <CardContent>
                    <CardMedia
                      component="img"
                      maxHeight={200}
                      maxWidth={200}
                      image={item.product.imageUrl || "https://i.gifer.com/MNu.gif"}
                      alt="product image"
                    />
                    <Typography variant='h6'>
                    {item.product.name}  ({item.quantity})
                      
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant='subtitle2' color="textSecondary">
                    Price:
                    <br></br>
                    ${item.product.price}
                    </Typography>
                    <Typography>
                    <br></br>
                    <br></br>
                    Subtotal
                    <hr></hr>
                    ${(item.quantity * +item.product.price).toFixed(2)}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant='subtitle2'>
                    <br></br>
                    <br></br>
                    <br></br>
                    </Typography>
                  </CardContent>
                  <CardContent>
                  </CardContent>
                    <Typography variant='subtitle2'>
                    </Typography>
                  <CardContent>
                        <div className="quantity" display='inline'>
                          <input
                            type="number"
                            className="quantity"
                            defaultValue="1"
                            min="1"
                            max={item.product.inventory < 10 ? product.inventory : 10}
                            name={item.id}
                            value={item.quantity}
                            onChange={onChange}
                          />
                        </div>
                        </CardContent>
                        <CardContent>
                      <div>
                        <button  value={item.id} onClick={onClick}>
                          X
                        </button>
      //TODO: add icon and fix weird sizing
                     </div>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))
        }
      </Grid>
      <section className="container">
       <div className="summary">
         <ul>
           <li>
             Subtotal <span>${total.toFixed(2)}</span>
           </li>
           <li>
             Tax <span>${(total * tax).toFixed(2)}</span>
           </li>
           <li className="total">
             Total <span>${total + (total * tax)}</span>
           </li>
         </ul>
       </div>
       <div className="checkout">
         <button onClick={handleSubmit} type="button">Check Out</button>
       </div>
     </section>
    </>
//   <div className="cart">
//     <header className="container">
//       <h1>Shopping Cart</h1>

//       <span className="count">{totalItems} items in the bag</span>
//     </header>
//     <section className="container">
//       <ul className="products">
//         {cartItems.map((item) => {
//           return (
//             <li className="row" key={item.id}>
//               <div className="col left">
//                 <div className="thumbnail">
//                   <a href="#">
//                     <img src={item.product.imageUrl} alt={item.product.name} />
//                   </a>
//                 </div>
//                 <div className="detail">
//                   <div className="name">
//                     <a href="#">{item.product.name}</a>
//                   </div>
//                   <div className="price">${item.product.price}</div>
//                   <div className="sub">${item.product.price * item.quantity}</div>
//                 </div>
//               </div>

//               <div className="col right">
//                 <div className="quantity">
//                   <input
//                     type="text"
//                     className="quantity"
//                     step="1"
//                     name={item.id}
//                     value={item.quantity}
//                     onChange={onChange}
//                   />
//                 </div>

//                 <div className="remove">
//                   <button value={item.id} onClick={onClick}>
//                     X ADD ICON
//                   </button>
//                 </div>
//               </div>
//             </li>
//           );
//         })}
//       </ul>
//     </section>
//     <section className="container">
//       {/* <div className="promotion">
//         <label htmlFor="promo-code">Have A Promo Code?</label>
//         <input type="text" onChange={onEnterPromoCode} />
//         <button type="button" onClick={checkPromoCode} />
//       </div> */}

//       <div className="summary">
//         <ul>
//           <li>
//             Subtotal <span>${total}</span>
//           </li>
//           {/* {discount > 0 && (
//             <li>
//               Discount <span>{formatCurrency(discount)}</span>
//             </li>
//           )} */}
//           <li>
//             Tax <span>${total * tax}</span>
//           </li>
//           <li className="total">
//             Total <span>${total + (total * tax)}</span>
//           </li>
//         </ul>
//       </div>
//       <div className="checkout">
//         <button type="button">Check Out</button>
//       </div>
//     </section>
// </div>
  );
}

const mapDispatch = (dispatch, {history}) => {
  return (
    {
      editOrderItem: (order) => dispatch(editOrderItem(order)),
      deleteOrderItem: (id) => dispatch(deleteOrderItem(id)),
      loadOrderItems: () => dispatch(loadOrderItems())
    }
  )
}
export default connect((state) => state, mapDispatch)(Cart)
  // return (
  //   <div>
  //     <Header itemCount={itemCount} />

  //     {products.length > 0 ? (
  //       <div>
  //         <ProductList
  //           products={products}
  //           onChangeProductQuantity={onChangeProductQuantity}
  //           onRemoveProduct={onRemoveProduct}
  //         />

  //         <Summary
  //           subTotal={subTotal}
  //           discount={discount}
  //           tax={TAX}
  //           onEnterPromoCode={onEnterPromoCode}
  //           checkPromoCode={checkPromoCode}
  //         />
  //       </div>
  //     ) : (
  //       <div className="empty-product">
  //         <h3>There are no products in your cart.</h3>
  //         <button onClick={() => setProducts(PRODUCTS)}>Shopping now</button>
  //       </div>
  //     )}
  //   </div>
  // );

