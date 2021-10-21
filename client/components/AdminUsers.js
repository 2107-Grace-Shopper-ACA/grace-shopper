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
import Clear from '@material-ui/icons/Clear';
import Edit from '@material-ui/icons/Edit';
import Search from '@material-ui/icons/Search';

/**
 * CLASS COMPONENT
 */
const AdminUsers = ({users, history, loadUsers}) => {
    
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef(() => ''),
      };
    
      const columns = [
        { title: 'User Name', field: 'username' },
        { title: 'Password', field: 'password' },
        { title: 'Admin', field: 'isAdmin', type: 'boolean' },
      ];
    
      // Material Table Columns Rows
      const data = users.sort((a,b) => a.username < b.username).map((user) =>  { return (
          {
              username: user.username, 
              password: user.password, 
              isAdmin: user.isAdmin ,
              id: user.id
          }
      )
      });
       

    //dialog box
    const [open, setOpen] = useState(false);
    const handleOpen = (ev) => {
        // ev.persist()
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
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
            <AdminUserForm handleClose={handleClose} history={history}/>
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
                  onClick: (ev, rowData) => history.push(`/admin/users/${rowData.id}`)
              }
          ]}
          options={{
              paging: false
          }}
          style={{
              margin: '2rem'
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
