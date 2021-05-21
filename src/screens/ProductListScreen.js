import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './../store/user';
import {
  selectAllProducts,
  loadProducts,
  deleteProduct,
  createProduct,
} from './../store/products';
import Loader from './../components/Loader';

import {
  Box,
  Button,
  Container,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';

import { selectApiValue } from './../store/api';
import { useHistory } from 'react-router';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Message from '../components/Message';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  delColor: {
    color: theme.palette.primary,
  },
  editColor: {},
}));

const ProductListScreen = ({ location }) => {
  const { loading, error } = useSelector(selectApiValue);
  const {
    list: productList,
    createSuccess,
    detail: productDetail,
  } = useSelector(selectAllProducts);
  const { userLoginInfo } = useSelector(selectUser);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!userLoginInfo && !userLoginInfo.isAdmin) {
      history.push('/');
    } else {
      // if (createSuccess) {
      //   history.push(`/admin/products/${productDetail._id}/edit`);
      // }
      dispatch(loadProducts());
    }
  }, [dispatch, userLoginInfo, history, productDetail, createSuccess]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message msg={error} />
      ) : (
        <>
          <Container>
            <Box py={5}>
              <Box display='flex' justifyContent='space-between' mb={3}>
                <Typography variant='h5'>محصولات :</Typography>
                <Button
                  variant='contained'
                  color='primary'
                  size='small'
                  startIcon={<AddIcon />}
                  onClick={() => {
                    // dispatch(createProduct());
                    history.push(`/admin/products/create`);
                  }}
                >
                  محصول جدید
                </Button>
              </Box>
              {productList && (
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell align='center'>شناسه</TableCell>
                        <TableCell align='center'>نام</TableCell>
                        <TableCell align='center'>قیمت</TableCell>
                        <TableCell align='center'>دسته بندی</TableCell>
                        <TableCell align='center'>برند</TableCell>
                        <TableCell align='center'>ویرایش</TableCell>
                        <TableCell align='center'>حذف</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {productList?.map((product) => (
                        <TableRow key={product._id}>
                          <TableCell align='center'>{product._id}</TableCell>
                          <TableCell align='center'>{product.name}</TableCell>
                          <TableCell align='center'>{product.price}</TableCell>
                          <TableCell align='center'>
                            {product.category}
                          </TableCell>
                          <TableCell align='center'>{product.brand}</TableCell>
                          <TableCell align='center'>
                            <IconButton
                              size='small'
                              onClick={() => {
                                history.push(
                                  `/admin/products/${product._id}/edit`
                                );
                              }}
                            >
                              <Box color={'primary.main'}>
                                <EditIcon fontSize='inherit' />
                              </Box>
                            </IconButton>
                          </TableCell>
                          <TableCell align='center'>
                            <IconButton
                              size='small'
                              onClick={() => {
                                if (window.confirm('پاک شود؟'))
                                  dispatch(deleteProduct(product._id));
                              }}
                            >
                              <Box color={'error.main'}>
                                <DeleteIcon fontSize='inherit' />
                              </Box>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          </Container>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
