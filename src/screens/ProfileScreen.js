import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, getUserDetail, updateUserProfile } from './../store/user';
import FormContaiter from './../components/FormContaiter';
import Loader from './../components/Loader';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
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
import { selectApiValue } from './../store/api';
import { useHistory } from 'react-router';
import Alert from '@material-ui/lab/Alert';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import { validateEmail } from './../publicFuncs';
import { getAllOrders, selectOrder } from '../store/order';

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
  const { loading } = useSelector(selectApiValue);
  const { userDetail, userLoginInfo, error } = useSelector(selectUser);
  const { allOrders } = useSelector(selectOrder);

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
      if (!userDetail) {
        dispatch(getUserDetail());
      } else {
        setName(userDetail.name);
        setEmail(userDetail.email);
      }
      dispatch(getAllOrders());
    }
  }, [dispatch, userLoginInfo, userDetail, history]);

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
    dispatch(updateUserProfile(name, email, password));
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
                  پروفایل شخصی
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
                    به روز رسانی
                  </Button>
                </FormControl>
              </FormGroup>
            </FormContaiter>
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
          </Container>
        </>
      )}
    </>
  );
};

export default ProfileScreen;
