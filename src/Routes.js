import { Route, Switch } from "react-router-dom";

//pages
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Products from "./components/Admin/Products";
import ProductsC from "./components/customer";
import ProductForm from "./components/Admin/Products/ProductForm";
import orders from "./components/customer/orders";
import lista from "./components/Admin/ListOrdes";
import Admin from "./components/Admin";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/productos/agregar" component={ProductForm} />
    <Route exact path="/productos/editar" component={ProductForm} />
    <Route exat path="/order" component={orders} />
    <Route exat path="/listaOrdenes" component={lista} />
    <Route exat path="/cliente" component={ProductsC} />
    <Route exat path="/admin" component={Admin} />
    <Route exat path="/ProducstA" component={Products} />
  </Switch>
);
export default Routes;
