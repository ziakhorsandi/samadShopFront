import React, { useEffect } from 'react';
import { Container, Grid, Box, Typography } from '@material-ui/core';
import Loader from './../components/Loader';
import Message from './../components/Message';
import Product from '../components/Product';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts, selectAllProducts } from '../store/products';
import { selectApiValue } from '../store/api';

const useStyles = makeStyles({
  gridItem: {
    display: 'grid',
    placeItems: 'center',
  },
});

const HomeScreen = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { list } = useSelector(selectAllProducts);
  const { loading, error } = useSelector(selectApiValue);
  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message msg={error} />
      ) : (
        <Container maxWidth='xl'>
          <Box fontWeight={900} my={4}>
            <Typography component='h1' variant='h6' color='primary'>
              جدید ترین محصولات :
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {list.map((product) => (
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
      )}
    </>
  );
};

export default HomeScreen;
