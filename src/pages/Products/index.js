import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddOutlinedIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { onValue, ref, remove } from "@firebase/database";
import { database } from "../../config/firebaseConfig";
import ProductCard from "./ProductCard";

const Products = () => {
     const [products, setProducts] = useState([]);

    const handleDelete = (id) => {
        console.log(id);
        remove(ref(database, `/products/${id}`))
        .then(() => {
            alert("Producto eliminado");
        })
    };

    const renderProducts =() => {
        return products.map((item) => (
            <ProductCard key={item.id} product={item} onDelete={handleDelete} />
        ))
    };

    useEffect(() => {
        let isMounted = true;

        onValue(
            ref(database, "products/"),
            (snapshot) => {
                const productsList = [];

                snapshot.forEach(item => {
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

    return(
        <Paper
        sx={{
            p: 3,
        }}
        >
            <Grid container spacing={3}>
                <Grid item xs={10}>
                  <h3 sx={{ m: 0 }}> Productos</h3>  
                </Grid>
                <Grid item xs={2}>
                <Button variant="outlined" LinkComponent={Link} to="/productos/agregar" startIcon={<AddOutlinedIcon />}>
                 Agregar
                </Button>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex' }} >
                    {renderProducts()}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Products;