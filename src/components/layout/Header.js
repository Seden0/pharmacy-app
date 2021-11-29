import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";


export default function Header() {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="absolute">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 0 }}
          >
          </Typography>
          <Link to="/login" >
            <Button color="inherit" LinkComponent={Link}>Login</Button>
          </Link>
          <Link to="/signup">
            <Button color="inherit" LinkComponent={Link}>SignUp</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}