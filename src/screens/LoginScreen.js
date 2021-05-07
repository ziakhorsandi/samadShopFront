import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from './../store/user';
import FormContaiter from './../components/FormContaiter';
import Loader from './../components/Loader';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormGroup,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { selectApiValue } from './../store/api';
import { useHistory } from 'react-router';
import Alert from '@material-ui/lab/Alert';

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

const LoginScreen = ({ location }) => {
  const { loading } = useSelector(selectApiValue);
  const { userLoginInfo, error } = useSelector(selectUser);
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const redirect = location.search ? location.search.split('=')[1] : '/';
  useEffect(() => {
    if (userLoginInfo) {
      history.push(redirect);
    }
  }, [userLoginInfo, history, redirect]);
  const formSubmit = () => {
    if (email === '' || password === '') {
      setEmailErr('وجود فیلد خالی');
      return;
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

    dispatch(login(email, password));
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
                  ورود
                </Typography>
                {error && <Alert severity='error'>{error}</Alert>}
                {emailErr && <Alert severity='error'>{emailErr}</Alert>}
                <FormControl className={classes.input}>
                  <InputLabel htmlFor='my-input'>پست الکترونیک</InputLabel>
                  <Input
                    id='my-input'
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
                  <InputLabel htmlFor='my-input'>کلمه ی عبور</InputLabel>
                  <Input
                    id='my-input'
                    aria-describedby='my-helper-text'
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position='start'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                          onMouseDown={(e) => {
                            e.preventDefault();
                          }}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
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
                    ورود
                  </Button>
                </FormControl>
              </FormGroup>
              <Typography variant='h2'>
                <Link to='/users/register' className={classes.link}>
                  <Box component='span' color='primary.main'>
                    {' '}
                    ثبت نام{' '}
                  </Box>
                </Link>

                <Box component='span'>کاربر جدید</Box>
              </Typography>
            </FormContaiter>
          </Container>
        </>
      )}
    </>
  );
};

export default LoginScreen;
