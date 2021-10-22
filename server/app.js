//alex's comment
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const app = express()

const Order = require('./db/models/Order');

module.exports = app
//corinne's comment
// logging middleware
app.use(morgan('dev'))

// body parsing middleware
app.use(express.json())

const stripe = require('stripe')('sk_test_51JmQ2ABj1g9TrN0Oc56w5ehAiaCGqvZKLHAdmNsmDP5lTWyyy3MjpwVrzHj9hVpMi669k4BgaTAHTliTouWTmoYf000RamHzJl');

const YOUR_DOMAIN = 'http://localhost:8080/checkout';

app.post("/create-checkout-session", async (req, res) => {
  try {
    const {items, orderId} = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map( (item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price,
          },
          quantity: item.quantity,
        }
      }),
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/success`,
      // success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/cancel`,
    })

// Change Order to not in cart and update order date to be NOW
//Create new cart order so we dont get errors in the product page
//TODO: need to deduct from inventory
//TODO: when you click back while in stripe it resets cart to 0
//TODO: find the right place to move this stuff

    res.json({ url: session.url })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

 
// auth and api routes
app.use('/auth', require('./auth'))
app.use('/api', require('./api'))

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '..', 'public/index.html')));

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')))

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
})

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})
