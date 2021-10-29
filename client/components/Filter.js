import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'

export default class Filter extends Component {
  render() {
    return (
      <div className="filter">
        <Typography
          className="filter-result"
          style={{
            color: 'white',
            background: 'linear-gradient(45deg, #ff820d, #f21f2a)',
            borderRadius: 10,
            boxShadow: '0 0px 3px 3px #c7570c',
            padding: '.4rem',
          }}
        >
          Displaying {this.props.count} Products
        </Typography>
        <div className="filter-sort">
          Sort by{' '}
          <select value={this.props.sort} onChange={this.props.sortProducts}>
            <option>A-Z</option>
            <option value="lowest">Price Low to High</option>
            <option value="highest">Price High to Low</option>
          </select>
        </div>
        <div className="filter-category">
          Filter by Category{' '}
          <select
            value={this.props.category}
            onChange={this.props.filterProducts}
          >
            <option value="">All</option>
            <option value="Small Pastas">Small Pastas</option>
            <option value="Ribbon-Cut">Ribbon-Cut</option>
            <option value="Stuffed">Stuffed</option>
            <option value="Tube-Shaped">Tube-Shaped</option>
          </select>
        </div>
      </div>
    )
  }
}
