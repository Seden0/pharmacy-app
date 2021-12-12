import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useEffect, useState } from "react";
import { ref, push, update } from "firebase/database";
import { database, storage } from "../../../config/firebaseConfig";
import { ref as stRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { withRouter, useLocation } from "react-router-dom";
import { Input } from "@mui/material";
//
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { menuItems } from "../menu2";
import MuiAppBar from "@mui/material/AppBar";
//
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

const ProductForma = (props) => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const location = useLocation();

  const [product, setProduct] = useState({
    sku: "",
    description: "",
    price: "",
    stock: "",
    image: ""
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };
  const handleImage = (e) => {
    if (!e.target.files[0]) return;

    const file = e.target.files[0];
    setImage({
      type: file.type.split("/")[1],
      file
    });
  };

  const saveProduct = (item) => {
    if (item.id) {
      //update
      const data = { ...item };
      delete data.id;
      update(ref(database, `/products/${item.id}`), data)
        .then(() => {
          props.history.push("/agregar");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      push(ref(database, "/products"), item)
        .then(() => {
          props.history.push("/agregar");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (image) {
      const imageName = `img_${Date.now()}.${image.type}`;
      const imageRef = stRef(storage, `/products/${imageName}`);

      uploadBytes(stRef(storage, imageRef), image.file).then(() => {
        //guardar en la base datos

        // primero obtner la url
        getDownloadURL(imageRef).then(
          (url) => {
            setProduct({
              ...product,
              image: url
            });
            saveProduct({ ...product, image: url });
          },
          (error) => {
            console.log(error);
          }
        );
      });
    } else {
      saveProduct(product);
    }
  };

  useEffect(() => {
    if (location?.state?.product) {
      setProduct({ ...location.state.product });
    }
  }, [location]);

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
              Pharmacy Orders
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {props.children}
            <Paper
              sx={{
                p: 3
              }}
            >
              <Grid
                container
                spacing={12}
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 3, justifyContent: "center" }}
              >
                <Grid item container xs={10} md={6} spacing={12}>
                  <Grid item xs={12}>
                    <TextField
                      name="sku"
                      required
                      fullWidth
                      label="Sku"
                      value={product.sku}
                      onChange={handleChange}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="name"
                      required
                      fullWidth
                      label="Nombre"
                      value={product.sku}
                      onChange={handleChange}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="description"
                      required
                      fullWidth
                      label="Descripción"
                      value={product.description}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="stock"
                      required
                      fullWidth
                      label="Existencias"
                      value={product.stock}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="price"
                      required
                      fullWidth
                      label="Precio"
                      value={product.price}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      type="file"
                      accept="image/*"
                      name="image"
                      id="productImage"
                      onChange={handleImage}
                      style={{ width: "1px" }}
                    />
                    <label htmlFor="productImage">
                      <Button
                        variant="contained"
                        component="span"
                        style={{ marginLeft: -1 }}
                      >
                        Imagen de producto
                      </Button>
                      {image && (
                        <span style={{ marginLeft: "13px" }}>
                          {image.file.name}
                        </span>
                      )}
                    </label>
                  </Grid>
                  {product.image && (
                    <Grid item xs={12} sx={{ m: 5, textAlign: "center" }}>
                      <img
                        src={product.image}
                        style={{
                          height: "120px",
                          width: "auto",
                          fitObject: "center"
                        }}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} sx={{ m: 5, textAlign: "center" }}>
                    <Button
                      type="submit"
                      variant="conteined"
                      startIcon={<SaveOutlinedIcon />}
                    >
                      Guardar producto
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default withRouter(ProductForma);
