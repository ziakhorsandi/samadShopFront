import React, { useEffect } from 'react';
import { Container, Grid, Box, Typography } from '@material-ui/core';
import Loader from './../components/Loader';
import Message from './../components/Message';
import Product from '../components/Product';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts, selectAllProducts } from '../store/products';
import { selectApiValue } from '../store/api';

import { Pagination, PaginationItem } from '@material-ui/lab';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  gridItem: {
    display: 'grid',
    placeItems: 'center',
  },
});

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const classes = useStyles();
  const { list, page, pages } = useSelector(selectAllProducts);
  const { loading, error } = useSelector(selectApiValue);
  const history = useHistory();
  useEffect(() => {
    dispatch(loadProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

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
            {list.length === 0 ? (
              <Typography component='h1' variant='h6' color='secondary'>
                موردی یافت نشد
              </Typography>
            ) : (
              list.map((product) => (
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
              ))
            )}
            <Grid
              container
              direction='row'
              justify='center'
              alignItems='center'
              item
            >
              {pages !== 1 && (
                <Pagination
                  page={page}
                  count={pages}
                  variant='outlined'
                  shape='rounded'
                  renderItem={(item) => (
                    <PaginationItem
                      {...item}
                      onClick={() => {
                        history.push(`/page/${item.page}`);
                      }}
                    />
                  )}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default HomeScreen;
