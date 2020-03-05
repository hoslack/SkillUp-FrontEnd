import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const NavBar = () => {
  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component='h3'>Scroll to see button</Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default NavBar
