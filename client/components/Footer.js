import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

export default function Footer() {

  return (
    <footer className='footer'>
        <Typography variant="subtitle1" style={{color: 'white'}}>
          Brought to you by Alex, Andy, and Corinne from <a href='http://www.fullstackacademy.com' style={{textDecoration: 'underline', color: 'red'}}>Fullstack Academy</a> © 2021 
        </Typography>
    </footer>
      
      
  );
}