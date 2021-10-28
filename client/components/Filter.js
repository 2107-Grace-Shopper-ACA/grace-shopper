import React, { Component } from 'react'

export default class Filter extends Component {
    render() {
        return (
            <div className='filter'>
                <div className='filter-result'>
                    {this.props.count} Products
                </div>
                <div className='filter-sort'>
                    Sort by{' '}
                    <select value={this.props.sort} onChange={this.props.sortProducts}>
                        <option>A-Z</option>
                        <option value='lowest'>Price Low to High</option>
                        <option value='highest'>Price High to Low</option>
                    </select>
                </div>
                <div className='filter-category'>
                    Filter by Category{' '}
                    <select value={this.props.category} onChange={this.props.filterProducts}>
                        <option value=''>All</option>
                        <option value='Small Pastas'>Small Pastas</option>
                        <option value='Ribbon-Cut'>Ribbon-Cut</option>
                        <option value='Stuffed'>Stuffed</option>
                        <option value='Tube-Shaped'>Tube-Shaped</option>
                    </select>
                </div>
            </div>
        )
    }
}
