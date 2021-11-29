import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
// import Alert from './Alert';
// import {ref, set} from "firebase/database";
// import database from '../config/firebaseConfig';
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";

const MyLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const theme = createTheme();

const SignUp = (props) => {
  const auth = getAuth();
  const [user,setUser] = useState({
    name: '',
    email:'',
    password:'',
    avatar:'',
  });

  const [setAlertMessage] = useState(null);

  const handleChange = (e) => {
    setUser({
      ...user, 
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) =>{
    e.preventDefault();

    setAlertMessage(null);

    createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(response =>{
      //guardar los datos del usuario
      delete user.password;
      // set(ref(database, `users/${response.user.uid}`),user);
      //alert
      setAlertMessage({
        type: 'success',
        message:'Bienvenido a Pharmacy SC Orders '
      });
      props.history.push('/')
    })
    .catch(error =>{
      console.log(error);
      setAlertMessage({
        type: 'error',
        message: error.message
      });
    })
  }
    
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary' }}>
            <VpnKeyOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nombre"
                  autoFocus
                  value={user.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                 required
                 fullWidth
                 id="email"
                 label="Correo electrónico"
                 name="email"
                 autoComplete="email"
                 value={user.email}
                 onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={user.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Confirmar contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={user.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  variant="outlined"
                  id="avatar"
                  label="Url de avatar"
                  name="avatar"
                  value={user.avatar}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Al registrarse, acepta nuestros términos y condiciones."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarme
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" component={MyLink} variant="body2">
                {"¿Ya tienes una cuenta? Inicia sesión"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* {alertMessage &&
        <Alert 
        type={alertMessage.type} 
        message={alertMessage.message} 
        autoclose={5000}
        />} */}
      </Container>
    </ThemeProvider>
  );
}
export default SignUp;