import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import ProductCard from './ProductCard'
import Filter from './Filter'

class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: this.props.products,
      category: '',
      sort: '',
    }
    this.filterProducts = this.filterProducts.bind(this)
    this.sortProducts = this.sortProducts.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.products.length && this.props.products.length) {
      this.setState({
        ...this.state,
        category: 'All',
        sort: 'A-Z',
        products: this.props.products.sort((a, b) =>
          a.name > b.name ? 1 : -1
        ),
      })
    }
  }

  filterProducts(event) {
    if (event.target.value === '') {
      this.setState({
        ...this.state,
        category: event.target.value,
        products: this.props.products,
      })
    } else {
      this.setState({
        ...this.state,
        category: event.target.value,
        products: this.props.products.filter(
          (product) => product.category.name === event.target.value
        ),
      })
    }
  }

  sortProducts(event) {
    const sort = event.target.value
    this.setState({
      ...this.state,
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === 'lowest'
            ? a.price * 1 > b.price * 1
              ? 1
              : -1
            : sort === 'highest'
            ? a.price * 1 < b.price * 1
              ? 1
              : -1
            : a.name > b.name
            ? 1
            : -1
        ),
    })
  }

  render() {
    const { products } = this.state
    //TODO: only bring in what we need from the store, like we should only bring in products that are active like in the line below -C
    return (
      <div id="product-gallery">
        <Filter
          count={products.length}
          category={this.state.category}
          sort={this.state.sort}
          filterProducts={this.filterProducts}
          sortProducts={this.sortProducts}
        />
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ margin: '3rem' }}
          spacing={4}
          direction="row"
          alignItems="stretch"
        >
          {products.map((product) => {
            return (
              <Grid
                key={product.id}
                item
                component={Card}
                xs={12}
                sm={8}
                md={6}
                lg={3}
                xl={2}
                style={{ margin: '1rem' }}
              >
                <ProductCard product={product} />
              </Grid>
            )
          })}
        </Grid>
      </div>
    )
  }
}

export default connect((state) => state)(Products)
