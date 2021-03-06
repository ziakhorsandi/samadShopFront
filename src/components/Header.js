import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';

import { useHistory } from 'react-router-dom';
import { selectUser } from './../store/user';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from './../store/user';
import { Box, Button } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { selectCart } from '../store/cart';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  btn: {
    // display: 'grid',
    // placeItems: 'center',
    margin: theme.spacing(0, 2),
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const { userLoginInfo } = useSelector(selectUser);
  const cartItems = useSelector(selectCart);
  const dispatch = useDispatch();
  const linkToSomewhere = (path) => {
    history.push(path);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLouOut = () => {
    dispatch(logOut());
    linkToSomewhere(`/`);
  };
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          history.push('/admin/users');
        }}
      >
        ??????????????
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          history.push('/admin/productlist');
        }}
      >
        ??????????????
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          history.push('/admin/orderlist');
        }}
      >
        ??????????????
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          if (userLoginInfo) {
            linkToSomewhere(`/users/profile`);
          } else {
            linkToSomewhere(`/users/login`);
          }
          handleMobileMenuClose();
        }}
      >
        <IconButton aria-label='account of current user' color='inherit'>
          <AccountCircle />
        </IconButton>
        {userLoginInfo ? <p>{userLoginInfo.name}</p> : <p>????????</p>}
      </MenuItem>

      {userLoginInfo?.isAdmin && (
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label='account of current user'
            aria-controls='primary-search-account-menu'
            aria-haspopup='true'
            color='inherit'
          >
            <SupervisorAccountIcon />
          </IconButton>
          <p>?????? ????????</p>
        </MenuItem>
      )}

      <MenuItem
        onClick={() => {
          linkToSomewhere(`/shopcart`);
          handleMobileMenuClose();
        }}
      >
        <IconButton aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={cartItems.length} color='secondary'>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>?????? ????????</p>
      </MenuItem>

      {userLoginInfo && (
        <MenuItem
          onClick={() => {
            handleLouOut();
            handleMobileMenuClose();
          }}
        >
          <IconButton aria-label='account of current user' color='inherit'>
            <ExitToAppIcon />
          </IconButton>
          <p>????????</p>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            className={classes.title}
            variant='h6'
            noWrap
            onClick={() => linkToSomewhere(`/`)}
            style={{ cursor: 'pointer' }}
          >
            ?????????? ?????? ??????
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='?????????? ...'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => {
                setTimeout(() => {
                  const keyword = e.target.value.trim();
                  if (keyword) {
                    history.push(`/search/${e.target.value}`);
                  } else {
                    history.push('/');
                  }
                }, 1000);
              }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {userLoginInfo && (
              <IconButton color='inherit' onClick={handleLouOut}>
                <ExitToAppIcon />
              </IconButton>
            )}
            <IconButton
              color='inherit'
              onClick={() => linkToSomewhere(`/shopcart`)}
            >
              <Badge badgeContent={cartItems.length} color='secondary'>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {userLoginInfo?.isAdmin && (
              <Button
                className={classes.btn}
                aria-controls={menuId}
                color='inherit'
                endIcon={<SupervisorAccountIcon />}
                onClick={handleProfileMenuOpen}
              >
                ?????? ????????
              </Button>
            )}

            <Button
              className={classes.btn}
              aria-controls={menuId}
              color='inherit'
              endIcon={<AccountCircle></AccountCircle>}
              onClick={() => {
                if (userLoginInfo) {
                  linkToSomewhere(`/users/profile`);
                } else {
                  linkToSomewhere(`/users/login`);
                }
              }}
            >
              <Box mt={0}>{userLoginInfo ? userLoginInfo.name : '????????'}</Box>
            </Button>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
