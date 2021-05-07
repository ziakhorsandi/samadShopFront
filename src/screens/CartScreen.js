import React, { useEffect } from 'react';

import {
  Card,
  Typography,
  CardContent,
  makeStyles,
  Container,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  Grid,
  CardActions,
  Button,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, delACart, selectCart } from './../store/cart';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  img: {
    objectFit: 'contain',
    maxWidth: '150px',
  },
  center: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
  shippingCard: {
    padding: '0.5rem',
  },
}));

const CartScreen = ({ match, location }) => {
  const history = useHistory();
  const classes = useStyles();

  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCart);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(match.params.id, qty));
    }
  }, [dispatch, match, qty, productId]);
  return (
    <Box py={5}>
      <Container maxWidth='lg'>
        <Grid container spacing={4} justify='center'>
          <Grid item md={8} xs={12}>
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent>
                  <Grid
                    container
                    spacing={2}
                    justify='center'
                    alignItems='center'
                  >
                    <Grid item xs={12} md={2} className={classes.center}>
                      <img
                        className={classes.img}
                        component='img'
                        alt='...'
                        src={item.image}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3} md={3} className={classes.center}>
                      <Typography variant='h2' component='div' align='center'>
                        {item.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3} md={3} className={classes.center}>
                      <Typography variant='h2' component='div' align='center'>
                        {item.price} تومان
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3} md={3} className={classes.center}>
                      {item.countInStock > 0 && (
                        <FormControl>
                          <InputLabel id='demo-simple-select-label'>
                            تعداد
                          </InputLabel>

                          <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={item.qty}
                            style={{ minWidth: '120px' }}
                            onChange={(e) => {
                              dispatch(
                                addToCart(item.id, Number(e.target.value))
                              );
                            }}
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <MenuItem key={x + 1} value={x + 1}>
                                {x + 1}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={1} md={1} className={classes.center}>
                      <IconButton
                        color='secondary'
                        aria-label='delete from shopping cart'
                        onClick={() => {
                          dispatch(delACart(item.id));
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Grid>
          <Grid item xs={12} sm={10} md={4}>
            <Card className={classes.shippingCard}>
              <CardContent>
                <Typography color='textPrimary' variant='h2'>
                  <Box mr={2} mb={2} component='span' lineHeight={2}>
                    مجموع {cartItems.reduce((acc, item) => acc + item.qty, 0)}{' '}
                    عدد کالا به ارزش{' '}
                    {cartItems.reduce(
                      (acc, item) => acc + item.qty * item.price,
                      0
                    )}{' '}
                    تومان
                  </Box>
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => {
                    history.push('/shipping');
                  }}
                >
                  تصویه
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CartScreen;
