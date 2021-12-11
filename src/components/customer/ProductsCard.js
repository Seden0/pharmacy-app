import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

export default function ProductCard({ product, onDelete }) {
  return (
    <Card sx={{ maxWidth: 250, m: 3, display: "block" }}>
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.description}
        sx={{
          p: "2px",
          objectFit: "cover",
          width: "100%",
          height: "auto"
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.description}
        </Typography>
        <Grid container>
          <Grid item xs={8}>
            <Typography variant="h6">$ {product.price}</Typography>
          </Grid>
          <Grid item xs={4}>
            {product.stock > 0 && <Chip label="Disponible" color="success" />}
            {product.stock <= 0 && <Chip label="Agotado" color="warning" />}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}></CardActions>
    </Card>
  );
}
