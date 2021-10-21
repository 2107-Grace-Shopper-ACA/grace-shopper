import React, {useState, useEffect} from 'react'
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
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { loadUsers } from '../store'
/**
 * COMPONENT
 */
const AdminProducts = ({products, history}) => {

    products = products.sort((a, b) => {return a.name < b.name ? -1 : 1});


    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
      };

      const columns = [
        { title: 'ID', field: 'id', filtering: false },
        { title: 'Product Name', field: 'name', filtering: false  },
        { title: 'Category', field: 'category' },
        { title: 'Description', field: 'description', filtering: false  },
        { title: 'Price', field: 'price' },
        { title: 'Inventory', field: 'inventory' },
        { title: 'Active', field: 'isActive', type: 'boolean' },
        { title: 'On Sale', field: 'onSale', type: 'boolean' },
      ];

      // Material Table Columns Rows
      const link = {color: 'darkblue', textDecoration: 'none'}
      const data = products.map((product) =>  { return (
          {
              id: product.id,
              name: product.name,
              category: product.category,
              description: product.description,
              price: +product.price,
              inventory: product.inventory,
              isActive: product.isActive,
              onSale: product.onSale,
          }
      )
      });

//dialog box
    const [open, setOpen] = useState(false);
    const handleOpen = (ev) => {
        // ev.persist()
        setOpen(true);
    }
    const handleClose = (ev) => {
        // ev.preventDefault();
        setOpen(false);
    }
//
    if (!products){
        return '...loading'
    }
    return (
        
        <div>
            <Dialog onClose={handleClose} open={open}>
                <AdminProductForm handleClose={handleClose} history={history}/>
            </Dialog>
            <MaterialTable
          title="Products"
          icons={tableIcons}
          columns={columns}
          data={data}
          actions={[
              {
                  icon: AddBox,
                  tooltip: 'Add Product',
                  isFreeAction: true,
                  onClick: ()=>handleOpen(),
              },
              {
                  icon: Edit,
                  tooltip: 'Edit Product',
                  isFreeAction: false,
                  onClick: (ev, rowData) => history.push(`/admin/products/${rowData.id}`)
              }
          ]}
          options={{
              paging: false,
              filtering: true
          }}
          style={{
              margin: '2rem'
          }}
        />  
        {/* <div>
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
            </TableContainer> */}
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
