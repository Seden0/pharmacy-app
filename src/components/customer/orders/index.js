import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Select from "@mui/material/Select";
import { onValue, ref } from "@firebase/database";
import { database } from "../../../config/firebaseConfig";
//

import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { menuItems } from "../menu";

const theme = createTheme();

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9)
      }
    })
  }
}));

const mdTheme = createTheme();

const Orders = (props) => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [products, setProducts] = useState([]);
  useEffect(() => {
    let isMounted = true;
    onValue(
      ref(database, "products/"),
      (snapshot) => {
        const productsList = [];

        snapshot.forEach((item) => {
          const productItem = {
            id: item.key,
            ...item.val()
          };
          productsList.push(productItem);
        });
        setProducts(productsList);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px" // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" })
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              App name
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1]
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>{menuItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto"
          }}
        >
          <Toolbar />
          <Container maxWidth="lg">
            {props.children}
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                >
                  <Typography component="h1" variant="h3">
                    Hacer orden
                  </Typography>
                  <Box component="form" noValidate sx={{ mt: 1 }}>
                    <Select
                      onChange={(e) => {
                        const selectProduct = e.target.value;
                        setProducts(selectProduct);
                      }}
                    >
                      <option val="products.list">option</option>
                    </Select>

                    <div>
                      <Grid>
                        <Typography sx={{ float: "left" }}>
                          <h3>Productos</h3>
                        </Typography>
                        <Typography sx={{ float: "right" }}>
                          <h3>Cantidad</h3>
                        </Typography>
                      </Grid>
                      <List
                        sx={{
                          width: "60%",
                          maxWidth: 360,
                          bgcolor: "background.paper",
                          position: "relative",
                          overflow: "auto",
                          maxHeight: 300,
                          "& ul": { padding: 0 }
                        }}
                        subheader={<li />}
                      >
                        {[0, 1, 2, 3, 4].map((sectionId) => (
                          <li key={`section-${sectionId}`}>
                            <ul>
                              {[0].map((item) => (
                                <ListItem key={`item-${sectionId}-${item}`}>
                                  <ListItemText primary={`Item ${item}`} />
                                </ListItem>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </List>
                    </div>
                    <Grid container justify="flex-end">
                      <h4 sx={{ float: "left" }}>Total</h4>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        sx={{
                          float: "right",
                          ml: 14
                        }}
                      />
                    </Grid>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, mb: 3, m: 6 }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, mb: 3, m: 6 }}
                    >
                      Aceptar
                    </Button>
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Orders;
