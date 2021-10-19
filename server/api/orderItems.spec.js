/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const { db, models: { OrderItem, Product } } = require('../db')
const seed = require('../../script/seed');
const app = require('../app');
const { Resolver } = require('enhanced-resolve');

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
      expect(res.body.length).to.equal(8);
      expect(res.body[0]).to.have.property('orderId');
      expect(res.body[0]).to.have.property('productId');
    });
    
//couldn't figure out how to write this test - C    
    // it('POST /api/orderitems', async () => {
    //   const product = await Product.create({name: 'test', inventory: 5, price: 5.55});
    //   const res = await request(app)
    //     .post('/api/orderitems')
    //     .send({
    //       quantity: 5,
    //       productId: product.id
    //     })
    //     .expect(200)
    //     .end((err, res) => {
    //       if (err) {
    //         reject(new Error('An error with post'))
    //       }
    //       resolve(res.body)
    //     })
        
  //     expect(res.body).to.be.an('object');
  //     expect(res.body).to.have.property('product');
  //     expect(res.body[0]).to.have.property('quantity', 5);
  //  });
  }) // end describe('/api/orderitems')
}) // end describe('OrderItem routes')
