import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUser,
  getUserDetail,
  updateUserProfile,
  userErrReset,
} from './../store/user';
import FormContaiter from './../components/FormContaiter';
import Loader from './../components/Loader';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormGroup,
  Input,
  InputAdornment,
  InputLabel,
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
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
// import { selectApiValue } from './../store/api';
import { useHistory } from 'react-router';
import Alert from '@material-ui/lab/Alert';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import { validateEmail } from './../publicFuncs';
import { getAllOrders, selectOrder } from '../store/order';
import {
  EMAIL_ATLEAST_LENGTH,
  EMAIL_CONFIRM_NOT_SAME,
  EMAIL_FORMAT_NOT_VALID,
  EMPTY_FIELD_EXIST,
} from '../messages';

import Skeleton from '@material-ui/lab/Skeleton';
import { Message } from '@material-ui/icons';

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

const ProfileScreen = ({ location }) => {
  // const { loading, error } = useSelector(selectApiValue);
  const {
    userDetail,
    userLoginInfo,
    message,
    loading: loadingUser,
    error: errorUser,
  } = useSelector(selectUser);
  const {
    allOrders,
    loading: loadingOrder,
    error: errorOrder,
  } = useSelector(selectOrder);

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

  useEffect(() => {
    if (!userLoginInfo) {
      history.push('/');
    } else {
      if (!userDetail || userDetail._id !== userLoginInfo._id) {
        dispatch(getUserDetail('profile'));
      } else {
        setName(userDetail.name);
        setEmail(userDetail.email);
      }
      // dispatch(getAllOrders());
    }
  }, [dispatch, userLoginInfo, userDetail, history]);
  useEffect(() => {
    dispatch(getAllOrders());
    return () => {
      dispatch(userErrReset());
    };
  }, [dispatch]);

  const formSubmit = () => {
    dispatch(userErrReset());
    if (email === '' || password === '' || name === '') {
      setNameErr(EMPTY_FIELD_EXIST);
      return;
    } else {
      setNameErr('');
    }
    if (!validateEmail(email)) {
      setEmailErr(EMAIL_FORMAT_NOT_VALID);
      return;
    } else {
      setEmailErr('');
    }

    if (password.length < 6) {
      setPasswordErr(EMAIL_ATLEAST_LENGTH);
      return;
    } else {
      setPasswordErr('');
    }

    if (password !== confirmPassword) {
      setPasswordErr(EMAIL_CONFIRM_NOT_SAME);
      return;
    } else {
      setPasswordErr('');
    }
    dispatch(updateUserProfile(name, email, password));
  };

  return (
    <>
      <Container>
        <FormContaiter>
          <FormGroup>
            <Typography gutterBottom variant='h6'>
              پروفایل شخصی
            </Typography>
            {message && <Alert severity='success'>{message}</Alert>}
            {errorUser && <Alert severity='error'>{errorUser}</Alert>}
            {nameErr && <Alert severity='error'>{nameErr}</Alert>}
            {loadingUser ? (
              <>
                <Skeleton animation={false} height={50} />
                <Skeleton animation='wave' />
                <Skeleton animation={false} height={50} />
                <Skeleton animation='wave' />
                <Skeleton animation={false} height={50} />
                <Skeleton animation='wave' />
                <Skeleton animation={false} height={50} />
                <Skeleton animation='wave' />
              </>
            ) : (
              <>
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
              </>
            )}
            <FormControl className={classes.btn}>
              {loadingUser ? (
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={formSubmit}
                  disabled={true}
                >
                  <CircularProgress disableShrink size={30} thickness={1} />
                </Button>
              ) : (
                <Button variant='outlined' color='primary' onClick={formSubmit}>
                  به روز رسانی
                </Button>
              )}
            </FormControl>
          </FormGroup>
        </FormContaiter>
        {loadingOrder ? (
          <Loader />
        ) : errorOrder ? (
          <Message msg={errorOrder} />
        ) : (
          <>
            {allOrders[0] && (
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>شناسه</TableCell>
                      <TableCell>قیمت کل</TableCell>
                      <TableCell align='center'>وضعیت پرداخت</TableCell>
                      <TableCell align='center'>وضعیت ارسال</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allOrders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell>{order._id}</TableCell>
                        <TableCell>{order.totalPrice}</TableCell>
                        {order.isPaid ? (
                          <TableCell align='center'>
                            <Box color='primary.main'>
                              <CheckCircleIcon />
                            </Box>
                          </TableCell>
                        ) : (
                          <TableCell align='center'>
                            <Box color='error.main'>
                              <HighlightOffIcon />
                            </Box>
                          </TableCell>
                        )}
                        {order.isDelivered ? (
                          <TableCell align='center'>
                            <Box color='primary.main'>
                              <CheckCircleIcon />
                            </Box>
                          </TableCell>
                        ) : (
                          <TableCell align='center'>
                            <Box color='error.main'>
                              <HighlightOffIcon />
                            </Box>
                          </TableCell>
                        )}
                        <TableCell>
                          <Button
                            style={{ width: '100%' }}
                            variant='outlined'
                            color='primary'
                            onClick={() => {
                              history.push(`/order/${order._id}`);
                            }}
                          >
                            جزییات
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default ProfileScreen;
