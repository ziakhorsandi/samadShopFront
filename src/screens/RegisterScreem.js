import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, selectUser } from './../store/user';
import FormContaiter from './../components/FormContaiter';
import Loader from './../components/Loader';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormGroup,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
  Typography,
} from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { selectApiValue } from './../store/api';
import { useHistory } from 'react-router';
import Alert from '@material-ui/lab/Alert';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import { validateEmail } from './../publicFuncs';
import CheckoutSteps from '../components/CheckoutSteps';

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

const RegisterScreen = ({ location }) => {
  const { loading } = useSelector(selectApiValue);
  const { userLoginInfo, error } = useSelector(selectUser);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [nameErr, setNameErr] = useState('');

  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.has('redirect')
    ? searchParams.get('redirect')
    : '/';

  useEffect(() => {
    if (userLoginInfo) {
      history.push(redirect);
    }
  }, [userLoginInfo, history, redirect]);
  const formSubmit = () => {
    if (email === '' || password === '' || name === '') {
      setNameErr('???????? ???????? ????????');
      return;
    } else {
      setNameErr('');
    }
    if (!validateEmail(email)) {
      setEmailErr('???????? ?????????? ???????????? ??????');
      return;
    } else {
      setEmailErr('');
    }

    if (password.length < 6) {
      setPasswordErr('???????? ?? ???????? ???????? ?????????? ???? 6 ?????????????? ????????');
      return;
    } else {
      setPasswordErr('');
    }

    if (password !== confirmPassword) {
      setPasswordErr('???????? ?????? ???????? ???? ???? ?????????? ????????????');
      return;
    } else {
      setPasswordErr('');
    }

    dispatch(register(name, email, password));
    // history.push(redirect);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {redirect === '/shipping' && <CheckoutSteps step1 />}
          <Container>
            <FormContaiter>
              <FormGroup>
                <Typography gutterBottom variant='h6'>
                  ?????? ??????
                </Typography>
                {error && <Alert severity='error'>{error}</Alert>}
                {nameErr && <Alert severity='error'>{nameErr}</Alert>}
                <FormControl className={classes.input}>
                  <InputLabel htmlFor='name'>?????? ????????????</InputLabel>
                  <Input
                    id='name'
                    aria-describedby='my-helper-text'
                    type='text'
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position='start'>
                        <Box color='text.secondary' mr={1.5}>
                          <AccountBoxIcon />
                        </Box>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {emailErr && <Alert severity='error'>{emailErr}</Alert>}
                <FormControl className={classes.input}>
                  <InputLabel htmlFor='email'>?????? ??????????????????</InputLabel>
                  <Input
                    id='email'
                    aria-describedby='my-helper-text'
                    type='email'
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position='start'>
                        <Box color='text.secondary' mr={1.5}>
                          <MailOutlineIcon />
                        </Box>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {passwordErr && <Alert severity='error'>{passwordErr}</Alert>}
                <FormControl className={classes.input}>
                  <InputLabel htmlFor='password'>???????? ?? ????????</InputLabel>
                  <Input
                    id='password'
                    aria-describedby='my-helper-text'
                    type='password'
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position='start'>
                        <Box color='text.secondary' mr={1.5}>
                          <VpnKeyIcon />
                        </Box>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl className={classes.input}>
                  <InputLabel htmlFor='confirmPass'>
                    ?????????? ???????? ?? ????????
                  </InputLabel>
                  <Input
                    id='confirmPass'
                    aria-describedby='my-helper-text'
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position='start'>
                        <Box color='text.secondary' mr={1.5}>
                          <VpnKeyIcon />
                        </Box>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl className={classes.btn}>
                  <Button
                    variant='outlined'
                    color='primary'
                    onClick={formSubmit}
                  >
                    ?????? ??????
                  </Button>
                </FormControl>
              </FormGroup>
              <Typography variant='h2'>
                <Link
                  to={`/users/login?redirect=${redirect}`}
                  className={classes.link}
                >
                  <Box component='span' color='primary.main'>
                    {' '}
                    ????????{' '}
                  </Box>
                </Link>

                <Box component='span'>?????????? ?????? ?????? ??????</Box>
              </Typography>
            </FormContaiter>
          </Container>
        </>
      )}
    </>
  );
};

export default RegisterScreen;
