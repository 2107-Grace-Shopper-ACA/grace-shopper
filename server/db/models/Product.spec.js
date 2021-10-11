/* global describe beforeEach it */

const {expect} = require('chai')
const { db, models: { Product } } = require('../index')

const seed = require('../../../script/seed');

describe('Product model', () => {
  let products;
  beforeEach(async() => {
    products = (await seed()).products;
  })
  it('seed populates four products', () => {
    expect(products).to.be.an('array');
    expect(products.length).to.equal(4);
  })

  
}) // end describe('Product model')
