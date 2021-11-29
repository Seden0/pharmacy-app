import { Route, Switch } from 'react-router-dom';

//pages
import Login from './components/Login';
import SignUp from './components/SignUp';
import Products from './pages/Products';
import ProductForm from './pages/Products/ProductForm';

const Routes = () => (
    <Switch>
        <Route exact patch="/" component={Login} />
        <Route exact patch="/login" component={Login} />
        <Route exact patch="/signup" component={SignUp} />
        <Route exact path="/productos" component ={Products}/>
        <Route exact path="/productos/agregar" component ={ProductForm}/>
        <Route exact path="/productos/editar" component ={ProductForm}/>
    </Switch>
);
export default Routes;