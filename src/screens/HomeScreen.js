import React, { useEffect } from 'react';
import { Container, Grid, Box, Typography } from '@material-ui/core';
import Loader from './../components/Loader';
import Message from './../components/Message';
import Product from '../components/Product';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTopRatedProducts,
  loadProducts,
  selectAllProducts,
} from '../store/products';
import { selectApiValue } from '../store/api';

import { Pagination, PaginationItem } from '@material-ui/lab';
import { useHistory } from 'react-router';
import ProductCarousel from '../components/ProductCarousel';
import Meta from './../components/Meta';

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
    async function waitForMe() {
      if (!keyword) {
        await dispatch(getTopRatedProducts());
      }
      dispatch(loadProducts(keyword, pageNumber));
    }
    waitForMe();
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message msg={error} />
      ) : (
        <Container maxWidth='xl'>
          <Box fontWeight={900} my={4}>
            {!keyword && (
              <>
                <Typography component='h1' variant='h6' color='primary'>
                  محصولات با بیشترین امتیاز :
                </Typography>
                <Grid container justify='center'>
                  <ProductCarousel />
                </Grid>
                <Typography component='h1' variant='h6' color='primary'>
                  جدید ترین محصولات :
                </Typography>
              </>
            )}
          </Box>
          {!loading && list.length === 0 ? (
            <Message msg='موردی یافت نشد' />
          ) : (
            <>
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
              <Grid
                container
                direction='row'
                justify='center'
                alignItems='center'
                item
              >
                {pages && page && pages !== 1 && (
                  <Box my={2}>
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
                  </Box>
                )}
              </Grid>
            </>
          )}
        </Container>
      )}
    </>
  );
};

export default HomeScreen;
