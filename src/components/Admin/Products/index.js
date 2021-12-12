import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link, withRouter } from "react-router-dom";
import { onValue, ref, remove } from "@firebase/database";
import { database } from "../../../config/firebaseConfig";
import ProductCard from "./ProductCard";

const ProductsA = () => {
  const [products, setProducts] = useState([]);
  const handleDelete = (id) => {
    console.log(id);
    remove(ref(database, `/product/${id}`)).then(() => {
      alert("Produsto eliminado");
    });
  };
  const renderProducts = () => {
    return products.map((item) => (
      <ProductCard key={item.id} product={item} onDelete={handleDelete} />
    ));
  };

  useEffect(() => {
    let isMounted = true;
    onValue(
      ref(database, "products/"),
      (snapshot) => {
        const productsList = [];

        snapshot.forEach((item) => {
          const productItem = {
            id: item.key,
            ...item.val()
          };
          productsList.push(productItem);
        });
        setProducts(productsList);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Paper
      sax={{
        p: 3
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <h3 sx={{ n: 0 }}>Products</h3>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="outlined"
            LinkComponent={Link}
            to="/productos/agregar"
            startIcon={<AddIcon />}
          >
            Agregar
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex" }}>
          {renderProducts()}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default withRouter(ProductsA);
