import React from 'react'
import {connect} from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

/**
 * CLASS COMPONENT
 */
const AdminProducts = ({products}) => {

    return (
        <div>
            <TableContainer component={Paper} style={{width: '100%', overflowX: 'auto'}}>
                <Table border={2} sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow  style={{backgroundColor:'dodgerblue'}}>
                        <TableCell></TableCell>
                        <TableCell>Product Name</TableCell>
                        <TableCell >Inventory</TableCell>
                        <TableCell >Price</TableCell>
                        <TableCell >Active</TableCell>
                        <TableCell >On Sale</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product, idx) => (
                            <TableRow
                            border={3}
                            key={product.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
                            >
                                    <TableCell component="th" scope="row">
                                        {idx + 1}
                                    </TableCell>
                                    <TableCell >
                                        <Link to={`/admin/products/${product.id}`}>
                                        {product.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell >{product.inventory}</TableCell>
                                    <TableCell >{product.price}</TableCell>
                                    <TableCell padding='checkbox'>
                                        <Checkbox disabled checked={product.isActive} /> 
                                    </TableCell>
                                    <TableCell padding='checkbox'>
                                        <Checkbox disabled checked={product.onSale} /> 
                                    </TableCell>
                            </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <div>
//TODO: add Dialog Box to Add New Product
            </div>
            <div id="product-gallery">
                {products.map((product) => {
                    return (
                    <div key={product.id}>
                        <Link to={`/admin/products/${product.id}`}>
                            {product.name} ({product.inventory}) ({(+product.price).toFixed(2)})
                            <br/>
                            <img src={product.imageUrl || "https://i.gifer.com/MNu.gif"}></img>
                        </Link>
                    </div>
                    );
                })}
            </div>     */}
        </div>
    )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    products: state.products
  }
}

export default connect(mapState)(AdminProducts)
