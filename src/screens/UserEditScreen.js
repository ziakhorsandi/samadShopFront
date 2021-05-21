import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUser,
  getUserDetail,
  updateUser,
  userErrReset,
} from './../store/user';
import FormContaiter from './../components/FormContaiter';
import Loader from './../components/Loader';
import BackIcon from '@material-ui/icons/ArrowBackRounded';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
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
import { validateEmail } from '../publicFuncs';
import { EMAIL_FORMAT_NOT_VALID, EMPTY_FIELD_EXIST } from '../messages';

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

const UserEditScreen = ({ match }) => {
  const userId = match.params.id;
  const { loading, error } = useSelector(selectApiValue);
  const { userDetail, userLoginInfo, message } = useSelector(selectUser);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdminCheck, setIsAdminCheck] = useState(false);

  const [emailErr, setEmailErr] = useState('');
  const [nameErr, setNameErr] = useState('');

  useEffect(() => {
    console.log('userEditScreen');
    if (!userLoginInfo) {
      history.push('/');
    } else {
      if (!userDetail || userDetail._id !== userId) {
        dispatch(getUserDetail(userId));
      } else {
        console.log(`userDetail`, userDetail);
        setName(userDetail.name);
        setEmail(userDetail.email);
        setIsAdminCheck(userDetail.isAdmin);
      }
    }
  }, [dispatch, userLoginInfo, userDetail, history, userId]);
  useEffect(() => {
    return () => {
      dispatch(userErrReset());
    };
  }, [dispatch]);

  const formSubmit = () => {
    dispatch(userErrReset());
    if (email === '' || name === '') {
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
    dispatch(updateUser({ _id: userId, name, email, isAdmin: isAdminCheck }));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Container>
            <FormContaiter>
              <Box my={2}>
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  <BackIcon />
                </Button>
              </Box>
              <FormGroup>
                <Typography gutterBottom variant='h6'>
                  پروفایل شخصی
                </Typography>
                {error && <Alert severity='error'>{error}</Alert>}
                {message && <Alert severity='success'>{message}</Alert>}
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
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isAdminCheck}
                      onChange={() => {
                        setIsAdminCheck(!isAdminCheck);
                      }}
                      name='checkedB'
                      color='primary'
                    />
                  }
                  label='مدیر'
                />
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
          </Container>
        </>
      )}
    </>
  );
};

export default UserEditScreen;
