import React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {getAuth, signOut} from 'firebase/auth'
import Link from '@mui/material/Link';
// import CustomAvatar from './CustomAvatar';
import { withRouter } from 'react-router-dom';

const User = ({history, user, onLogout}) =>{

    const auth = getAuth();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogout = () =>{
        setAnchorEl(null);

       signOut(auth).then(()=>{
            if(onLogout)onLogout();
            history.push('/login');
        });
    };

    return (
        <div>
        <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
        >
        {/* <CustomAvatar name={user.name} avatar={user.avatar} size="sm"/> */}
        </IconButton>
        <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
        >
            <MenuItem disabled>{user.name}</MenuItem>
            <MenuItem>
                <Link href="/profile" variant="body2" onClick={handleClose}>
                    Mi perfil                
                </Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>Salir</MenuItem>
        </Menu>
        </div>
    );
};

export default withRouter(User);