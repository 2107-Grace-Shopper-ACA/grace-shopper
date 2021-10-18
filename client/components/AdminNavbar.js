import React from 'react'
import {Link} from 'react-router-dom'

const AdminNavbar = () => (
  <div>
    <nav>
      <Link to="/admin/users">Users</Link>
      <Link to="/admin/products">Products</Link>
      
    </nav>
    <hr />
  </div>
)

export default AdminNavbar
