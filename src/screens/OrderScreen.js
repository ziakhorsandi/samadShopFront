import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { selectApiValue } from './../store/api';
import { selectUser } from '../store/user';
import Loader from './../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectOrder,
  getOrderById,
  payOrder,
  orderReset,
  deliverOrder,
} from './../store/order';

import { selectPaymentMethod, selectShippingAddress } from '../store/cart';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';
import Message from './../components/Message';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3, 'auto'),
  },
  divider: {
    margin: theme.spacing(0, 1.5),
  },
  img: {
    objectFit: 'contain',
    maxWidth: '100px',
  },
  cartItem: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      minHeight: '200px',
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 3),
  },
}));

const PlaceorderScreen = ({ match }) => {
  const { error, loading } = useSelector(selectApiValue);
  const classes = useStyles();
  const shipAdd = useSelector(selectShippingAddress);
  const payMeth = useSelector(selectPaymentMethod);
  const dispatch = useDispatch();
  const { success, detail: order } = useSelector(selectOrder);
  const orderId = match.params.id;
  const { userLoginInfo } = useSelector(selectUser);
  const history = useHistory();

  const {
    shippingPrice,
    taxPrice,
    totalPrice,
    isPaid,
    isDelivered,
    orderItems,
    paidAt,
  } = order;
  const itemsPrice = orderItems?.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  useEffect(() => {
    if (!userLoginInfo) {
      history.push('/');
    } else {
      if (!success) {
        dispatch(getOrderById(orderId));
      }
    }
    return () => {
      dispatch(orderReset());
    };
  }, [orderId, dispatch, success, history, userLoginInfo]);

  const paySubmit = () => {
    dispatch(payOrder(orderId, { msg: 'This order is payed' }));
  };
  const deliverSubmit = () => {
    dispatch(deliverOrder(orderId));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message msg={error} />
      ) : (
        <>
          <Container maxWidth='xl'>
            <div style={{ padding: '0 20px' }}>
              <Grid
                container
                className={classes.root}
                spacing={5}
                justify='center'
              >
                <Grid item xs={12} md={6}>
                  <Typography gutterBottom variant='h6'>
                    ?????????? ???? ?????????? ?? : {orderId}
                  </Typography>
                  <Box mb={3} mt={1}>
                    <Typography gutterBottom variant='h6'>
                      ?????????? ???? ????????:
                    </Typography>
                    <Typography variant='h2'>
                      <Box lineHeight={2}>
                        {shipAdd.address} {shipAdd.city} {shipAdd.country}
                        <div>???? ???? ???????? : {shipAdd.postalCode}</div>
                      </Box>
                    </Typography>
                  </Box>
                  {isDelivered ? (
                    <Alert severity='success'>
                      {'?????????? ?????? ???? : '}
                      <span>{paidAt.substring(0, 10)}</span>
                    </Alert>
                  ) : (
                    <Alert severity='error'>{'?????????? ???? ?????? ?????????? ??????'}</Alert>
                  )}
                  <Divider className={classes.divider} />

                  <Box my={2}>
                    <Typography variant='h6' component='span'>
                      ???????????? ???? ???????? :{' '}
                    </Typography>
                    <Typography variant='h2' component='span'>
                      {payMeth}
                    </Typography>
                  </Box>
                  {isPaid ? (
                    <Alert severity='success'>
                      {'???????????? ?????? ???? : '}
                      <span>{paidAt.substring(0, 10)}</span>
                    </Alert>
                  ) : (
                    <Alert severity='error'>{'???????????? ???????? ????????????'}</Alert>
                  )}
                  <Divider className={classes.divider} />

                  <Typography gutterBottom variant='h6'>
                    <Box mb={5} mt={3}>
                      ?????????? ?????????? ???????? ?????? :
                    </Box>
                  </Typography>
                  {orderItems?.length === 0 ? (
                    <Alert severity='error'>{'?????? ???????? ???????? ??????'}</Alert>
                  ) : (
                    orderItems?.map((item) => (
                      <Typography key={item.id} variant='h2'>
                        <div className={classes.cartItem}>
                          <img
                            src={`${process.env.REACT_APP_SERVER_URL}${item.image}`}
                            alt='...'
                            className={classes.img}
                          />
                          {item.name}
                          <Box dir='ltr'>
                            {item.qty}*{item.price}={item.qty * item.price}
                          </Box>
                        </div>
                        <Box my={1} px={3}>
                          <Divider />
                        </Box>
                      </Typography>
                    ))
                  )}
                </Grid>
                <Grid item lg={1}></Grid>
                <Grid item xs={12} md={5} lg={4}>
                  <List>
                    <Typography gutterBottom variant='h6'>
                      ?????????? :
                    </Typography>
                    <ListItem>
                      <ListItemText primary='??????????' />
                      <ListItemText
                        align='left'
                        secondary={`${itemsPrice} ??????????`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary='?????? ?? ??????' />
                      <ListItemText
                        align='left'
                        secondary={`${shippingPrice} ??????????`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary='????????????' />
                      <ListItemText
                        align='left'
                        secondary={`${taxPrice} ??????????`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary='??????????' />
                      <ListItemText
                        align='left'
                        secondary={`${totalPrice} ??????????`}
                      />
                    </ListItem>
                    {!isPaid && (
                      <ListItem>
                        <Button
                          style={{ width: '100%' }}
                          variant='outlined'
                          color='primary'
                          onClick={paySubmit}
                        >
                          ????????????
                        </Button>
                      </ListItem>
                    )}
                    {!isDelivered && userLoginInfo?.isAdmin && (
                      <ListItem>
                        <Button
                          style={{ width: '100%' }}
                          variant='outlined'
                          color='primary'
                          onClick={deliverSubmit}
                        >
                          ??????????
                        </Button>
                      </ListItem>
                    )}
                  </List>
                </Grid>
              </Grid>
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default PlaceorderScreen;
