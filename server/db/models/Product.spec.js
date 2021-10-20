/* global describe beforeEach it */

const {expect} = require('chai')
const { db, models: { Product } } = require('../index')

const seed = require('../../../script/seed');

describe('Product model', () => {
  let products;
  beforeEach(async() => {
    products = (await seed()).products;
  })
  it('seed populates 27 products', () => {
    expect(products).to.have.all.keys(["farfalle", "orecchiette", "rotini", "orzo", "ditalini", "stelline", "spaghetti", "capellini", "vermicelli", "linguine", "tagliatelle", "fettuccine", "pappardelle", "bucatini", "lasagna", "penne", "rigatoni", "macaroni", "cannelloni", "manicotti", "ziti", "ravioli", "tortellini", "cappelletti", "agnolotti", "fagottini", "mezzelune"]);
  })
  
}) // end describe('Product model')
