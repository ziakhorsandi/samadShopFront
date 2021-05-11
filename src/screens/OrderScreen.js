import React, { useEffect } from 'react';
import { selectApiValue } from './../store/api';
import Loader from './../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrder, getOrderById, payOrder } from './../store/order';
import { useHistory } from 'react-router-dom';
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
  // const cartItems = useSelector(selectCart);
  const history = useHistory();
  const dispatch = useDispatch();
  const { success, detail: order } = useSelector(selectOrder);
  const orderId = match.params.id;

  const {
    shippingPrice,
    taxPrice,
    totalPrice,
    isPaid,
    isDelivered,
    orderItems,
  } = order;
  const itemsPrice = orderItems?.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  useEffect(() => {
    if (!success) {
      dispatch(getOrderById(orderId));
    }
  }, [orderId, dispatch, success]);

  const formSubmit = () => {
    dispatch(payOrder(orderId, { msg: 'This order is payed' }));
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
                    سفارش به شماره ی : {orderId}
                  </Typography>
                  <Box mb={3} mt={1}>
                    <Typography gutterBottom variant='h6'>
                      ارسال به ادرس:
                    </Typography>
                    <Typography variant='h2'>
                      <Box lineHeight={2}>
                        {shipAdd.address} {shipAdd.city} {shipAdd.country}
                        <div>به کد پستی : {shipAdd.postalCode}</div>
                      </Box>
                    </Typography>
                  </Box>
                  {isDelivered ? (
                    <Alert severity='error'>{'سفارش تحویل شده'}</Alert>
                  ) : (
                    <Alert severity='error'>{'سفارش در حال ارسال است'}</Alert>
                  )}
                  <Divider className={classes.divider} />

                  <Box my={2}>
                    <Typography variant='h6' component='span'>
                      پرداخت از طریق :{' '}
                    </Typography>
                    <Typography variant='h2' component='span'>
                      {payMeth}
                    </Typography>
                  </Box>
                  {isPaid ? (
                    <Alert severity='success'>{'پرداخت شده'}</Alert>
                  ) : (
                    <Alert severity='error'>{'پرداخت صورت نگرفته'}</Alert>
                  )}
                  <Divider className={classes.divider} />

                  <Typography gutterBottom variant='h6'>
                    <Box mb={5} mt={3}>
                      اجناس سفارش داده شده :
                    </Box>
                  </Typography>
                  {orderItems?.length === 0 ? (
                    <Alert severity='error'>{'سبد خرید خالی است'}</Alert>
                  ) : (
                    orderItems?.map((item) => (
                      <Typography key={item.id} variant='h2'>
                        <div className={classes.cartItem}>
                          <img
                            src={item.image}
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
                      مجموع :
                    </Typography>
                    <ListItem>
                      <ListItemText primary='اجناس' />
                      <ListItemText
                        align='left'
                        secondary={`${itemsPrice} تومان`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary='حمل و نقل' />
                      <ListItemText
                        align='left'
                        secondary={`${shippingPrice} تومان`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary='مالیات' />
                      <ListItemText
                        align='left'
                        secondary={`${taxPrice} تومان`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary='مجموع' />
                      <ListItemText
                        align='left'
                        secondary={`${totalPrice} تومان`}
                      />
                    </ListItem>
                    {!isPaid && (
                      <ListItem>
                        <Button
                          style={{ width: '100%' }}
                          variant='outlined'
                          color='primary'
                          onClick={formSubmit}
                        >
                          پرداخت
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
