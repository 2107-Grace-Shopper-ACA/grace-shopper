/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const { db, models: { Order } } = require('../db')
const seed = require('../../script/seed');
const app = require('../app')

describe('Order routes', () => {
  beforeEach(async() => {
    await seed();
  })

  describe('/api/orders', () => {
    it('GET /api/orders/', async () => {
      const res = await request(app)
        .get('/api/orders/')
        .expect(200)

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(3);
      expect(res.body[0]).to.have.property('userId');
      expect(res.body[0]).to.have.property('orderItems');
    });
    it('GET /api/orders/:orderId', async () => {
      const orders = await Order.findAll()
      const res = await request(app)
        .get(`/api/orders/${orders[0].id}`)
        .expect(200)

      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('userId');
      expect(res.body).to.have.property('orderItems');
    });
    it('GET /api/orders/users/:userId', async () => {
      const res = await request(app)
        .get('/api/orders/users/1')
        .expect(200)

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(3);
      expect(res.body[0]).to.have.property('orderItems');
    }); 
  }) // end describe('/api/orders')
}) // end describe('Order routes')
