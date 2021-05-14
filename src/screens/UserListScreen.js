import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, getUserLists, deleteUser } from './../store/user';
import FormContaiter from './../components/FormContaiter';
import Loader from './../components/Loader';

import {
  Box,
  Container,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

import { selectApiValue } from './../store/api';
import { useHistory } from 'react-router';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Message from '../components/Message';

const useStyles = makeStyles((theme) => ({
  delColor: {
    color: theme.palette.primary,
  },
  editColor: {},
}));

const ProfileScreen = ({ location }) => {
  const { loading, error } = useSelector(selectApiValue);
  const { userList, userLoginInfo } = useSelector(selectUser);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!userLoginInfo && !userLoginInfo.isAdmin) {
      history.push('/');
    } else {
      dispatch(getUserLists());
    }
  }, [dispatch, userLoginInfo, history]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message msg={error} />
      ) : (
        <>
          <Container>
            <FormContaiter>
              {userList[0] && (
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell align='center'>نام</TableCell>
                        <TableCell align='center'>پست الکترونیک</TableCell>
                        <TableCell align='center'>ویرایش</TableCell>
                        <TableCell align='center'>حذف</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {userList.map((user) => (
                        <TableRow key={user._id}>
                          <TableCell align='center'>{user.name}</TableCell>
                          <TableCell align='center'>{user.email}</TableCell>
                          <TableCell align='center'>
                            <IconButton
                              size='small'
                              onClick={() => {
                                history.push(`/admin/users/${user._id}/edit`);
                              }}
                            >
                              <Box color={'primary.main'}>
                                <EditIcon fontSize='inherit' />
                              </Box>
                            </IconButton>
                          </TableCell>
                          <TableCell align='center'>
                            <IconButton
                              size='small'
                              onClick={() => {
                                if (window.confirm('پاک شود؟'))
                                  dispatch(deleteUser(user._id));
                              }}
                            >
                              <Box color={'error.main'}>
                                <DeleteIcon fontSize='inherit' />
                              </Box>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </FormContaiter>
          </Container>
        </>
      )}
    </>
  );
};

export default ProfileScreen;
