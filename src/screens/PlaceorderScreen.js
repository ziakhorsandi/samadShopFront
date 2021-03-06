import React, { useEffect } from 'react';
import { selectApiValue } from './../store/api';
import Loader from './../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, selectOrder } from './../store/order';
import { useHistory } from 'react-router-dom';
import { selectPaymentMethod, selectShippingAddress } from '../store/cart';
import CheckoutSteps from '../components/CheckoutSteps';
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

import { selectCart } from './../store/cart';
import Alert from '@material-ui/lab/Alert';

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

const PlaceorderScreen = () => {
  const { error, loading } = useSelector(selectApiValue);
  const classes = useStyles();
  const shipAdd = useSelector(selectShippingAddress);
  const payMeth = useSelector(selectPaymentMethod);
  const cartItems = useSelector(selectCart);
  const history = useHistory();
  const dispatch = useDispatch();
  const { success, detail: order } = useSelector(selectOrder);

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10000;
  const taxPrice = Number(0.09 * itemsPrice);
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  useEffect(() => {
    if (!shipAdd.address) {
      history.push('/shipping');
    }
    if (!payMeth) {
      history.push('/payment');
    }
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, payMeth, shipAdd, success]);
  const formSubmit = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: shipAdd,
        paymentMethod: payMeth,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
    );
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <CheckoutSteps step1 step2 step3 step4 />
          <Container maxWidth='xl'>
            <div style={{ padding: '0 20px' }}>
              <Grid
                container
                className={classes.root}
                spacing={5}
                justify='center'
              >
                <Grid item xs={12} md={6}>
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

                  <Divider className={classes.divider} />

                  <Box my={2}>
                    <Typography variant='h6' component='span'>
                      ???????????? ???? ???????? :{' '}
                    </Typography>
                    <Typography variant='h2' component='span'>
                      {payMeth}
                    </Typography>
                  </Box>
                  <Divider className={classes.divider} />

                  <Typography gutterBottom variant='h6'>
                    <Box mb={5} mt={3}>
                      ?????????? ?????????? ???????? ?????? :
                    </Box>
                  </Typography>
                  {cartItems?.length === 0 ? (
                    <Alert severity='error'>{'?????? ???????? ???????? ??????'}</Alert>
                  ) : (
                    cartItems?.map((item) => (
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
                    <ListItem>
                      {error && <Alert severity='error'>{error}</Alert>}
                    </ListItem>
                    <ListItem>
                      <Button
                        style={{ width: '100%' }}
                        variant='outlined'
                        color='primary'
                        onClick={formSubmit}
                      >
                        ????????
                      </Button>
                    </ListItem>
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
