import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  makeStyles,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import FormContaiter from '../components/FormContaiter';
import Alert from '@material-ui/lab/Alert';

import CheckoutSteps from './../components/CheckoutSteps';
import { selectApiValue } from './../store/api';
import { addPaymentMethod, selectShippingAddress } from './../store/cart';
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

const PaymentScreen = () => {
  const classes = useStyles();

  const [paymentMethod, setPaymentMethod] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  const dispatch = useDispatch();

  const { error, loading } = useSelector(selectApiValue);
  const shipAdd = useSelector(selectShippingAddress);

  useEffect(() => {
    if (!shipAdd.address) {
      history.push('/shipping');
    }
  }, [shipAdd, history]);

  const formSubmit = () => {
    if (paymentMethod) {
      dispatch(addPaymentMethod(paymentMethod));
      history.push('/placeorder');
    } else {
      setMessage('نوع پرداخت را انتخاب کنید');
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <CheckoutSteps step1 step2 step3 />
          <Container>
            <FormContaiter>
              <FormGroup>
                <Typography gutterBottom variant='h6'>
                  انتخاب نوع پرداخت
                </Typography>
                {error && <Alert severity='error'>{error}</Alert>}
                {message && <Alert severity='error'>{message}</Alert>}

                <FormControl component='fieldset'>
                  {/* <FormLabel component='legend'>Gender</FormLabel> */}
                  <RadioGroup
                    aria-label='pay'
                    name='pay1'
                    value={paymentMethod}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                    }}
                  >
                    <FormControlLabel
                      value='payPal'
                      control={<Radio />}
                      label='payPal'
                    />

                    <FormControlLabel
                      value='pay.ir'
                      disabled
                      control={<Radio />}
                      label='pay.ir'
                    />
                  </RadioGroup>
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

export default PaymentScreen;
