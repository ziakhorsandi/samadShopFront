import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../store/user';
import { getAllOrdersFromAllUsers, selectOrder } from '../store/order';
import Loader from '../components/Loader';

import {
  Box,
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
} from '@material-ui/core';

import { selectApiValue } from '../store/api';
import { useHistory } from 'react-router';

import EditIcon from '@material-ui/icons/Edit';
import Message from '../components/Message';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
  delColor: {
    color: theme.palette.primary,
  },
  editColor: {},
}));

const OrderListScreen = ({ location }) => {
  const { loading, error } = useSelector(selectApiValue);
  const { allOrders: orders } = useSelector(selectOrder);
  const { userLoginInfo } = useSelector(selectUser);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!userLoginInfo && !userLoginInfo.isAdmin) {
      history.push('/');
    } else {
      dispatch(getAllOrdersFromAllUsers());
    }
  }, [dispatch, userLoginInfo, history]);

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
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'>شناسه</TableCell>
                      <TableCell align='center'>تاریخ ایجاد</TableCell>
                      <TableCell align='center'>نام کاربر</TableCell>
                      <TableCell align='center'>قیمت کل</TableCell>
                      <TableCell align='center'>تاریخ پرداخت</TableCell>
                      <TableCell align='center'>تاریخ ارسال</TableCell>
                      <TableCell align='center'>ویرایش</TableCell>
                      {/* <TableCell align='center'>حذف</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders?.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell align='center'>{order._id}</TableCell>
                        <TableCell align='center'>
                          {order.createdAt.substring(0, 10)}
                        </TableCell>
                        <TableCell align='center'>
                          {order.user && order.user.name}
                        </TableCell>
                        <TableCell align='center'>{order.totalPrice}</TableCell>
                        <TableCell align='center'>
                          {order.isPaid ? (
                            order.paidAt.substring(0, 10)
                          ) : (
                            <HighlightOffIcon />
                          )}
                        </TableCell>
                        <TableCell align='center'>
                          {order.isDelivered ? (
                            order.deliveredAt.substring(0, 10)
                          ) : (
                            <HighlightOffIcon />
                          )}
                        </TableCell>
                        <TableCell align='center'>
                          <IconButton
                            size='small'
                            onClick={() => {
                              history.push(`/order/${order._id}`);
                            }}
                          >
                            <Box color={'primary.main'}>
                              <EditIcon fontSize='inherit' />
                            </Box>
                          </IconButton>
                        </TableCell>
                        {/* <TableCell align='center'>
                          <IconButton
                            size='small'
                            // onClick={() => {
                            //   if (window.confirm('پاک شود؟'))
                            //     dispatch(deleteProduct(product._id));
                            // }}
                          >
                            <Box color={'error.main'}>
                              <DeleteIcon fontSize='inherit' />
                            </Box>
                          </IconButton>
                        </TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Container>
        </>
      )}
    </>
  );
};

export default OrderListScreen;
