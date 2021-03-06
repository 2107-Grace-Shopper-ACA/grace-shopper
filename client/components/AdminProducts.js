import React, {useState} from 'react'
import {connect} from 'react-redux'
import AdminProductForm from './AdminProductForm';
import Dialog from '@material-ui/core/Dialog';
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
        { title: 'ID', field: 'id', filtering: false,
            cellStyle: {
                width: 20,
                maxWidth: 20,
                textOverflow: 'ellipsis', 
                whiteSpace: 'nowrap', 
                overflow: 'hidden',
            },
            headerStyle: {
                width: 20,
                maxWidth: 20
            }
        },
        { title: 'Product Name', field: 'name', filtering: false  },
        { title: 'Category', field: 'category', filtering: false },
        { title: 'Description', field: 'description', filtering: false,
            cellStyle: {
                width: 30,
                maxWidth: 30,
                textOverflow: 'ellipsis', 
                whiteSpace: 'nowrap', 
                overflow: 'hidden',
            },
            headerStyle: {
                width: 30,
                maxWidth: 30
            }
        },
        { title: 'Image URL', field: 'imageUrl', filtering: false,
            cellStyle: {
                width: 20,
                maxWidth: 20,
                textOverflow: 'ellipsis', 
                whiteSpace: 'nowrap', 
                overflow: 'hidden',
            },
            headerStyle: {
                width: 20,
                maxWidth: 20
            }
        },
        { title: 'Price', field: 'price', filtering: false, type: 'currency',
            cellStyle: {
                width: 10,
                maxWidth: 10,
            },
            headerStyle: {
                width: 10,
                maxWidth: 10
            }
        },
        { title: 'Inventory', field: 'inventory', filtering: false, type: 'integer',
            cellStyle: {
                width: 10,
                maxWidth: 10,
            },
            headerStyle: {
                width: 10,
                maxWidth: 10
            }
         },
        { title: 'Active', field: 'isActive', type: 'boolean',
        cellStyle: {
            width: 5,
            maxWidth: 5,
        },
        headerStyle: {
            width: 5,
            maxWidth: 5
        }
         },
        { title: 'On Sale', field: 'onSale', type: 'boolean',
            cellStyle: {
                width: 5,
                maxWidth: 5,
            },
            headerStyle: {
                width: 5,
                maxWidth: 5
            }
         },
      ];

      // Material Table Columns Rows
      const data = products.map((product) =>  { return (
          {
              id: product.id,
              name: product.name,
              category: product.category.name,
              description: product.description,
              imageUrl: product.imageUrl,
              price: +product.price,
              inventory: +product.inventory,
              isActive: product.isActive,
              onSale: product.onSale,
              categoryId: product.categoryId
          }
      )
      });

    const [action, setAction] = useState('');
    const [product, setProduct] = useState('');
//dialog box
    const [open, setOpen] = useState(false);
    const handleOpen = (ev, product) => {
        product ? setAction('edit') : '';
        product ? setProduct(product) : '';
        setOpen(true);
    }
    const handleClose = (ev) => {
        // ev.preventDefault();
        setOpen(false);
        setAction('')
    }
//
    if (!products){
        return '...loading'
    }
    return (
        <div>
            <Dialog onClose={handleClose} open={open}>
                <AdminProductForm handleClose={handleClose} history={history} product={product} action={action} />
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
                        onClick: (ev,rowData)=>handleOpen(ev, rowData),
                    }
                ]}
                options={{
                    filtering: true,
                    headerStyle: {
                        color: 'white',
                        background: '#3523d9',
                        
                    }
                }}
                style={{
                    margin: '2rem',
                    color: 'black',
                    borderRadius: 10,
                    boxShadow: '0 0px 7px 7px #ffffff',
                    backgroundColor: 'lightSteelBlue'
                }}
            />  
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
