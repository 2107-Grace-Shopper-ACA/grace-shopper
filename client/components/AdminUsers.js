import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

import { loadUsers } from '../store'
import AdminUserForm from './AdminUserForm';
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
 * CLASS COMPONENT
 */
const AdminUsers = ({users, history, loadUsers}) => {

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
        <TableContainer component={Paper} style={{width: '100%', overflowX: 'auto'}}>
            <Table border={2} sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow  style={{backgroundColor:'cornsilk'}}>
                    <TableCell width='5%'><Button onClick={handleOpen} size='small' color='primary' variant='contained'>Add User</Button></TableCell>
                    <TableCell>User Name</TableCell>
                    <TableCell >Password</TableCell>
                    <TableCell >Admin</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user, idx) => (
                        <TableRow
                        border={3}
                        sx={{ '&:last-child td, &:last-child th': { border: 1, key: `${user.id}` } }}
                        >
                            <TableCell component="th" scope="row">
                                {idx + 1}
                            </TableCell>
                            <TableCell >
                                <Link to={`/admin/users/${user.id}`}>
                                {user.username}
                                </Link>
                            </TableCell>
                            <TableCell >{user.password}</TableCell>
                            <TableCell padding='checkbox'>
                                <Checkbox disabled checked={user.isAdmin} /> 
                            </TableCell>
                        </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
            
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
