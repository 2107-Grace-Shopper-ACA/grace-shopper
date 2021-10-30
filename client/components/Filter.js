import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import { hydrate } from 'react-dom'

export default class Filter extends Component {
  render() {
    return (
      <div className="filter">
        <Typography
          className="filter-result"
          style={{
            color: 'white',
            background: 'linear-gradient(45deg, #2ef2a0, #e8de27)',
            borderRadius: 10,
            boxShadow: '0 0px 3px 3px #34ba20',
            padding: '.4rem',
          }}
        >
          Displaying {this.props.count} Products
        </Typography>
        <Typography
          className="filter-sort"
          style={{
            margin: '1rem',
            color: 'white',
            background: 'linear-gradient(45deg, #ba20a8, #e35927)',
            flexDirection: 'row',
            borderRadius: 10,
            boxShadow: '0 0px 3px 3px #c7570c',
            padding: '.4rem',
          }}
        >
          Sort by{' '}
          <select
            value={this.props.sort}
            onChange={this.props.sortProducts}
            style={{ background: 'none', color: 'white', border: 'none', outline: 'none' }}
          >
            <option value=''>A-Z</option>
            <option value="lowest">Price Low to High</option>
            <option value="highest">Price High to Low</option>
          </select>
        </Typography>
        <Typography
          className="filter-category"
          style={{
            color: 'white',
            background: 'linear-gradient(45deg, #3523d9, #00d3de)',
            flexDirection: 'row',
            borderRadius: 10,
            boxShadow: '0 0px 3px 3px #0745a3',
            padding: '.4rem',
          }}
        >
          Filter by Category{' '}
          <select
            value={this.props.category}
            onChange={this.props.filterProducts}
            style={{ background: 'none', color: 'white', border: 'none', outline: 'none' }}
          >
            <option value=''>All</option>
            <option value="Small Pastas">Small Pastas</option>
            <option value="Ribbon-Cut">Ribbon-Cut</option>
            <option value="Stuffed">Stuffed</option>
            <option value="Tube-Shaped">Tube-Shaped</option>
          </select>
        </Typography>
      </div>
    )
  }
}
