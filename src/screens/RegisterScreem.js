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

  const redirect = location.search ? location.search.split('=')[1] : '/';
  useEffect(() => {
    if (userLoginInfo) {
      history.push(redirect);
    }
  }, [userLoginInfo, history, redirect]);
  const formSubmit = () => {
    if (email === '' || password === '' || name === '') {
      setNameErr('وجود فیلد خالی');
      return;
    } else {
      setNameErr('');
    }
    if (!validateEmail(email)) {
      setEmailErr('فرمت ایمیل نادرست است');
      return;
    } else {
      setEmailErr('');
    }

    if (password.length < 6) {
      setPasswordErr('کلمه ی عبور باید بیشتر از 6 کاراکتر باشد');
      return;
    } else {
      setPasswordErr('');
    }

    if (password !== confirmPassword) {
      setPasswordErr('کلمه های عبور با هم تطابق ندارند');
      return;
    } else {
      setPasswordErr('');
    }

    dispatch(register(name, email, password));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Container>
            <FormContaiter>
              <FormGroup>
                <Typography gutterBottom variant='h6'>
                  ثبت نام
                </Typography>
                {error && <Alert severity='error'>{error}</Alert>}
                {nameErr && <Alert severity='error'>{nameErr}</Alert>}
                <FormControl className={classes.input}>
                  <InputLabel htmlFor='name'>نام کاربری</InputLabel>
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
                  <InputLabel htmlFor='email'>پست الکترونیک</InputLabel>
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
                  <InputLabel htmlFor='password'>کلمه ی عبور</InputLabel>
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
                    تکرار کلمه ی عبور
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
                    ثبت نام
                  </Button>
                </FormControl>
              </FormGroup>
              <Typography variant='h2'>
                <Link to='/users/login' className={classes.link}>
                  <Box component='span' color='primary.main'>
                    {' '}
                    ورود{' '}
                  </Box>
                </Link>

                <Box component='span'>کاربر ثبت نام شده</Box>
              </Typography>
            </FormContaiter>
          </Container>
        </>
      )}
    </>
  );
};

export default RegisterScreen;
