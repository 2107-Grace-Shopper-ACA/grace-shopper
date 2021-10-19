import React, {useState} from 'react'
import {connect} from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import AdminProductForm from './AdminProductForm';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

/**
 * COMPONENT
 */
const AdminProducts = ({products, history}) => {

//dialog box
    const [open, setOpen] = useState(false);
    const handleOpen = (ev) => {
        ev.persist()
        setOpen(true);
    }
    const handleClose = (ev) => {
        ev.preventDefault();
        setOpen(false);
    }
//

    return (
        <div>
            <Dialog onClose={handleClose} open={open}>
                <AdminProductForm handleClose={handleClose} history={history}/>
            </Dialog>
            <TableContainer component={Paper} style={{width: '100%', overflowX: 'auto'}}>
                <Table border={2} sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow  style={{backgroundColor:'cornsilk'}}>
                        <TableCell width='5%'><Button onClick={handleOpen} size='small' color='primary' variant='contained'>Add Product</Button></TableCell>
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
        </div>
    )
}

/**
 * CONTAINER
 */
const mapState = (state, {history}) => {
  return {
    products: state.products,
    history: history
  }
}

export default connect(mapState)(AdminProducts)
