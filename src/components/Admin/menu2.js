import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListAltIcon from "@mui/icons-material/ListAlt";
import GradingIcon from "@mui/icons-material/Grading";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

export const menuItems = (
  <div>
    <ListItem to="/agregar" component={Link}>
      <ListItemIcon>
        <ListAltIcon />
      </ListItemIcon>
      <ListItemText primary="Lista de Productos" />
    </ListItem>
    <ListItem to="/listaOrdenes" component={Link}>
      <ListItemIcon>
        <GradingIcon />
      </ListItemIcon>
      <ListItemText primary="Ver ordenes" />
    </ListItem>
    <ListItem to="/login" component={Link}>
      <ListItemIcon>
        <ArrowBackIcon />
      </ListItemIcon>
      <ListItemText primary="Salir" />
    </ListItem>
  </div>
);
