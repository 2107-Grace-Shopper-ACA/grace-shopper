/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const { db, models: { OrderItem } } = require('../db')
const seed = require('../../script/seed');
const app = require('../app')

describe('OrderItem routes', () => {
  beforeEach(async() => {
    await seed();
  })

  describe('/api/orderitems/', () => {
    it('GET /api/orderitems', async () => {
      const res = await request(app)
        .get('/api/orderitems')
        .expect(200)

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(4);
      expect(res.body[0]).to.have.property('orderId');
      expect(res.body[0]).to.have.property('productId');
    });
  }) // end describe('/api/orderitems')
}) // end describe('OrderItem routes')
