import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { database, storage } from "../../config/firebaseConfig";
import Button from "@mui/material/Button";
import {
  GridColumnMenu,
  GridColumnMenuContainer,
  GridFilterMenuItem,
  SortGridMenuItems,
  useGridApiRef,
  DataGridPro
} from "@mui/x-data-grid-pro";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const StyledGridColumnMenuContainer = styled(GridColumnMenuContainer)(
  ({ theme, ownerState }) => ({
    background: theme.palette[ownerState.color].main,
    color: theme.palette[ownerState.color].contrastText
  })
);

const StyledGridColumnMenu = styled(GridColumnMenu)(
  ({ theme, ownerState }) => ({
    background: theme.palette[ownerState.color].main,
    color: theme.palette[ownerState.color].contrastText
  })
);

function CustomColumnMenuComponent(props) {
  const { hideMenu, currentColumn, color, ...other } = props;

  if (currentColumn.field === "ID") {
    return (
      <StyledGridColumnMenuContainer
        hideMenu={hideMenu}
        currentColumn={currentColumn}
        ownerState={{ color }}
        {...other}
      >
        <SortGridMenuItems onClick={hideMenu} column={currentColumn} />
        <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
      </StyledGridColumnMenuContainer>
    );
  }
  if (currentColumn.field === "Total") {
    return (
      <StyledGridColumnMenuContainer
        hideMenu={hideMenu}
        currentColumn={currentColumn}
        ownerState={{ color }}
        {...other}
      >
        <Box
          sx={{
            width: 127,
            height: 160,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <StarOutlineIcon sx={{ fontSize: 80 }} />
        </Box>
      </StyledGridColumnMenuContainer>
    );
  }
  return (
    <StyledGridColumnMenu
      hideMenu={hideMenu}
      currentColumn={currentColumn}
      ownerState={{ color }}
      {...other}
    />
  );
}

CustomColumnMenuComponent.propTypes = {
  color: PropTypes.string.isRequired,
  currentColumn: PropTypes.object.isRequired,
  hideMenu: PropTypes.func.isRequired
};

export { CustomColumnMenuComponent };

export default function CustomColumnMenu() {
  const [color, setColor] = React.useState("primary");
  const apiRef = useGridApiRef();

  return (
    <div
      style={{
        width: "100%"
      }}
    >
      <Typography>
        <h1 sx={{ textAling: "center" }}>Lista de Pedidos</h1>
      </Typography>
      <div style={{ height: 250, width: "100%", marginTop: 16 }}>
        <DataGridPro
          apiRef={apiRef}
          columns={[
            { field: "ID", width: 150 },
            { field: "Pedido", width: 150 },
            { field: "Total", width: 150 }
          ]}
          rows={[
            {
              id: 1,
              ID: "23r3d",
              Total: 280,
              Pedido: "Pomada de la Campana"
            },
            {
              id: 2,
              ID: "453r4",
              Total: 782,
              Pedido: "Pastillas Next, Pañales Huggies"
            }
          ]}
          components={{
            ColumnMenu: CustomColumnMenuComponent
          }}
          componentsProps={{
            columnMenu: { color }
          }}
        />
      </div>
    </div>
  );
}
