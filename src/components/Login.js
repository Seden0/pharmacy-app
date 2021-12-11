import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { withRouter } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

const MyLink = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));

const Login = (props) => {
  const auth = getAuth();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage("");

    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((response) => {
        props.history.push("/cliente");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Typography component="h1" variant="h4">
        Ingresa a tu cuenta
      </Typography>
      <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Acceder
        </Button>
        <Grid container>
          <Grid item>
            <Link to="/signup" component={MyLink} variant="body2">
              {"¿No tienes cuenta? Registrate"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default withRouter(Login);
