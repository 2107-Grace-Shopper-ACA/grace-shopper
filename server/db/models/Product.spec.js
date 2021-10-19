/* global describe beforeEach it */

const {expect} = require('chai')
const { db, models: { Product } } = require('../index')

const seed = require('../../../script/seed');

describe('Product model', () => {
  let products;
  beforeEach(async() => {
    products = (await seed()).products;
  })
  it('seed populates six products', () => {
    expect(products).to.have.all.keys(['penne', 'spaghetti', 'mafaldine', 'garganelli', 'rigatoni', 'macaroni']);
  })
  
}) // end describe('Product model')
