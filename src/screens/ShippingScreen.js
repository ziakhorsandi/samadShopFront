import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  makeStyles,
  Typography,
} from '@material-ui/core';
import FormContaiter from '../components/FormContaiter';
import Alert from '@material-ui/lab/Alert';

import CheckoutSteps from './../components/CheckoutSteps';
import { selectApiValue } from './../store/api';
import { addShippingAddress, selectShippingAddress } from './../store/cart';
import Loader from './../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  input: {
    margin: theme.spacing(1, 0, 2, 0),
  },
  btn: {
    margin: theme.spacing(3, 0),
  },
  link: {
    textDecoration: 'none',
  },
}));

const ShippingScreen = () => {
  const history = useHistory();
  const classes = useStyles();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const { error, loading } = useSelector(selectApiValue);
  const shipAdd = useSelector(selectShippingAddress);

  useEffect(() => {
    if (shipAdd.address) {
      setAddress(shipAdd.address);
      setCity(shipAdd.city);
      setPostalCode(shipAdd.postalCode);
      setCountry(shipAdd.country);
    }
  }, [shipAdd]);

  const formSubmit = () => {
    if (address && city && postalCode && country) {
      dispatch(addShippingAddress({ address, city, postalCode, country }));
      history.push('/payment');
    } else {
      setMessage('وجود فیلد خالی');
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <CheckoutSteps step1 step2 />
          <Container>
            <FormContaiter>
              <FormGroup>
                <Typography gutterBottom variant='h6'>
                  تکمیل آدرس ها
                </Typography>
                {error && <Alert severity='error'>{error}</Alert>}
                {message && <Alert severity='error'>{message}</Alert>}
                <FormControl className={classes.input}>
                  <InputLabel htmlFor='add'>آدرس</InputLabel>
                  <Input
                    id='add'
                    aria-describedby='my-helper-text'
                    type='text'
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl className={classes.input}>
                  <InputLabel htmlFor='city'>شهر</InputLabel>
                  <Input
                    id='city'
                    aria-describedby='my-helper-text'
                    type='text'
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl className={classes.input}>
                  <InputLabel htmlFor='postalCode'>کد پستی</InputLabel>
                  <Input
                    id='postalCode'
                    aria-describedby='my-helper-text'
                    type='text'
                    value={postalCode}
                    onChange={(e) => {
                      const { value } = e.target;
                      setPostalCode(value);
                    }}
                  />
                </FormControl>
                <FormControl className={classes.input}>
                  <InputLabel htmlFor='country'>کشور</InputLabel>
                  <Input
                    id='country'
                    aria-describedby='my-helper-text'
                    type='text'
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                    }}
                  />
                </FormControl>

                <FormControl className={classes.btn}>
                  <Button
                    variant='outlined'
                    color='primary'
                    onClick={formSubmit}
                  >
                    بعدی
                  </Button>
                </FormControl>
              </FormGroup>
            </FormContaiter>
          </Container>
        </>
      )}
    </>
  );
};

export default ShippingScreen;
