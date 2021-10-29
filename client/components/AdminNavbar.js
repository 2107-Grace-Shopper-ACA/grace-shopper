import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core'
const AdminNavbar = () => {
  const username = useSelector(state => state.auth.username)
  return (
    <div>
      <nav>
      <AppBar position='sticky' style={{backgroundColor: 'black'}}>
              <Toolbar>
                <Typography color='secondary'>
                  {username}
                </Typography>
                <Button>
                  <Link to="/admin/users">Users</Link>
                </Button>
                <Button>
                  <Link to="/admin/products">Products</Link>
                </Button>
                  <Button>
                    <Link to="/admin/orders">Orders</Link>
                  </Button>
              </Toolbar>
            </AppBar>
      </nav>
    </div>

  )
}

export default AdminNavbar
