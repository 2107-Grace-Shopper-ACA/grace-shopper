import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import { loadUsers } from '../store'
import AdminUserForm from './AdminUserForm';
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
 * CLASS COMPONENT
 */
const AdminUsers = ({users, history, loadUsers}) => {
    
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
        { title: 'User Name', field: 'username' },
        { title: 'Password', field: 'password',
        cellStyle: {
            width: 10,
            maxWidth: 10,
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap', 
            overflow: 'hidden',
        },
        headerStyle: {
            width: 10,
            maxWidth: 10
        } },
        { title: 'Email', field: 'email',
        cellStyle: {
            width: 10,
            maxWidth: 10,
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap', 
            overflow: 'hidden',
        },
        headerStyle: {
            width: 10,
            maxWidth: 10
        } },
        { title: 'Phone Number', field: 'phone',
        cellStyle: {
            width: 10,
            maxWidth: 10,
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap', 
            overflow: 'hidden',
        },
        headerStyle: {
            width: 10,
            maxWidth: 10
        } },
        { title: 'Address', field: 'streetAddress',
        cellStyle: {
            width: 10,
            maxWidth: 10,
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap', 
            overflow: 'hidden',
        },
        headerStyle: {
            width: 10,
            maxWidth: 10
        } },
        { title: 'City', field: 'city',
        cellStyle: {
            width: 10,
            maxWidth: 10,
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap', 
            overflow: 'hidden',
        },
        headerStyle: {
            width: 10,
            maxWidth: 10
        } },
        { title: 'State', field: 'state' },
        { title: 'Zipcode', field: 'zipcode' },
        { title: 'Admin', field: 'isAdmin', type: 'boolean' },
      ];
    
      // Material Table Columns Rows
      const data = users.sort((a,b) => a.username < b.username).map((user) =>  { return (
          {
              username: user.username, 
              password: user.password, 
              email: user.email, 
              phone: user.phoneNumber, 
              streetAddress: user.streetAddress, 
              city: user.city,
              state: user.state,
              zipcode: user.zipcode,
              isAdmin: user.isAdmin ,
              id: user.id
          }
      )
      });
       
    const [action, setAction] = useState('');
    const [user, setUser] = useState('');
    //dialog box
    const [open, setOpen] = useState(false);
    const handleOpen = (ev, user) => {
        // ev.persist()
        user ? setAction('edit') : '' ;
        user ? setUser(user) : '' ;
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setAction('')
    }
//
    useEffect(() => {
        loadUsers();
    }, []);

    
    if (!users){
        return '...loading'
    }
    return (
        <>
        <Dialog onClose={handleClose} open={open}>
            <AdminUserForm handleClose={handleClose} history={history} user={user} action={action}/>
        </Dialog>
        <MaterialTable
          title="Users"
          icons={tableIcons}
          columns={columns}
          data={data}
          actions={[
              {
                  icon: AddBox,
                  tooltip: 'Add User',
                  isFreeAction: true,
                  onClick: ()=>handleOpen(),
              },
              {
                  icon: Edit,
                  tooltip: 'Edit User',
                  isFreeAction: false,
                  onClick: (ev,rowData)=>handleOpen(ev, rowData),
              }
          ]}
          options={{
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
            
        </>    
    )
}

/**
 * CONTAINER
 */
const mapState = (state, {history}) => {
  return {
    users: state.users,
    history: history
  }
}

const mapDispatch = dispatch => {
    return {
        loadUsers: () => dispatch(loadUsers())
    }
}

export default connect(mapState, mapDispatch)(AdminUsers)
