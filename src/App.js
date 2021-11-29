import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react'
// import CssBaseline from '@mui/material/CssBaseline';
// import Header from './components/layout/Header';
// import Index from './components/layout/index';
// import Products from './pages/Products';
// import User from './components/User';
import Layout from './components/layout';
import Routes from './Routes';
// import CssBaseline from '@mui/material/CssBaseline';
// import User from './components/User';
// import {loadUser} from './utils/dbUtils';
// import {getAuth} from "firebase/auth";
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { blue, pink } from '@mui/material/colors';

// const theme = createTheme({
//   palette: {
//     primary:{main: blue[700]},   
//   }, 
//   secondary:pink,
// });

function App(){

// const auth = getAuth();

// const [user, setUser] = useState(null);

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

  return (
    <Router>
      <Layout>
        <Routes />
      </Layout>
    </Router>
  );
}

export default App;
