import { BrowserRouter as Router } from "react-router-dom";
import React, { useState } from "react";
import Routes from "./Routes";
// import CssBaseline from '@mui/material/CssBaseline';
import User from "./components/User";
// import {loadUser} from './utils/dbUtils';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "./config/firebaseConfig";
import { ref, set } from "firebase/database";
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { blue, pink } from '@mui/material/colors';
import Login from "./components/Login";
// const theme = createTheme({
//   palette: {
//     primary:{main: blue[700]},
//   },
//   secondary:pink,
// });

function App() {
  const auth = getAuth();

  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      setUser(usuarioFirebase);
    } else {
      setUser(null);
    }
  });
  // const onLogout = () =>{
  //   setUser(null);
  // };

  // useEffect(()=>{
  //  auth.onAuthStateChanged (response => {
  //     if (response) {
  //       loadUser(response.uid)
  //       .then(data =>{setUser(data);});
  //     }
  //   });
  // },[]);
  //<>{user ? <cliente/> : <Login/>}</>;
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
