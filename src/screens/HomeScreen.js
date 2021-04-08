import React from 'react';
import { Container, Grid, Box, Typography } from '@material-ui/core';
import Product from '../components/Product';
import { makeStyles } from '@material-ui/core/styles';
import products from '../products';

const useStyles = makeStyles({
  gridItem: {
    display: 'grid',
    placeItems: 'center',
  },
});

const HomeScreen = () => {
  const classes = useStyles();

  return (
    <Container maxWidth='xl'>
      <Box fontWeight={900} my={4}>
        <Typography component='h1' variant='h6' color='primary'>
          جدید ترین محصولات :
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid
            key={product._id}
            className={classes.gridItem}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
          >
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomeScreen;
