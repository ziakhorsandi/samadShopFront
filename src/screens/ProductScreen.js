import React, { useEffect, useState } from 'react';
import {
  Card,
  CardMedia,
  Grid,
  Container,
  Box,
  CardContent,
  Typography,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  Avatar,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Raiting from './../components/Raiting';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import BackIcon from '@material-ui/icons/ArrowBackRounded';
import { useHistory } from 'react-router-dom';
import {
  getProductById,
  selectAllProducts,
  setReview,
  productReset,
} from './../store/products';
import { selectApiValue } from './../store/api';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './../components/Loader';
import Message from './../components/Message';
import Rating from '@material-ui/lab/Rating';
import StarIcon from '@material-ui/icons/StarRounded';
import Alert from '@material-ui/lab/Alert';
import { EMPTY_FIELD_EXIST } from '../messages';

const labels = {
  0.5: 'کاملا به درد نخور',
  1: 'به درد نخور',
  1.5: 'خیلی ضعیف',
  2: 'ضعیف',
  2.5: 'خوب',
  3: 'خیلی خوب',
  3.5: 'عالی',
  4: 'خیلی عالی',
  4.5: 'مهشر',
  5: 'خیلی مهشر',
};

const useStyles = makeStyles((theme) => ({
  img: {
    maxHeight: '300px',
    objectFit: 'contain',
  },
  button: {
    margin: theme.spacing(1),
    direction: 'rtl',
  },
  formControl: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(2),
    minWidth: 120,
  },
}));

const ProductScreen = ({ match }) => {
  const dispatch = useDispatch();
  const { detail: product } = useSelector(selectAllProducts);
  const { loading, error } = useSelector(selectApiValue);
  const classes = useStyles();
  const history = useHistory();
  const [qty, setQty] = useState(1);

  const [rateVal, setRateVal] = useState(-1);
  const [hover, setHover] = useState(-1);
  const [comment, setComment] = useState('');
  const [ratingError, setRatingError] = useState('');

  useEffect(() => {
    dispatch(getProductById(match.params.id));

    // dispatch(loadProductDetail(match.params.id));
    // return () => {
    //   dispatch(productReset());
    // };
  }, [dispatch, match]);

  useEffect(() => {
    return () => {
      dispatch(productReset());
    };
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message msg={error} />
      ) : (
        <Container maxWidth='lg'>
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

          <Grid container spacing={3}>
            <Grid item xs={12} sm={7} md={8}>
              <Card>
                <Grid container>
                  <Grid item lg={6}>
                    <CardMedia
                      className={classes.img}
                      component='img'
                      alt='...'
                      src={product.image}
                      // image={product.image}
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <CardContent>
                      <Typography variant='h6' component='h2'>
                        {product.name}
                      </Typography>
                      <Box my={1}>
                        <Raiting
                          value={product.rating}
                          txt={`از ${product.numReviews} بازدید`}
                        />
                      </Box>

                      <Typography
                        variant='body2'
                        component='div'
                        paragraph={true}
                        // gutterBottom={true}
                      >
                        قیمت : {product.price} تومان
                      </Typography>
                      <Typography
                        variant='body2'
                        component='p'
                        paragraph={true}
                      >
                        {product.description}
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            <Grid item xs={12} sm={5} md={4}>
              <Card variant='outlined'>
                <CardContent>
                  <Typography variant='body2' component='div' paragraph={true}>
                    <Box mx={2}>قیمت : {product.price} تومان</Box>
                  </Typography>
                  <Typography variant='body2' component='div' paragraph={true}>
                    <Box display='flex' alignItems='center'>
                      <Box mx={2}>وضعیت :</Box>
                      {product.countInStock > 0 ? (
                        <Box color='primary.main'>موجود</Box>
                      ) : (
                        <Box color='error.main'>ناموجود</Box>
                      )}
                    </Box>

                    {product.countInStock > 0 && (
                      <FormControl className={classes.formControl}>
                        <InputLabel id='demo-simple-select-label'>
                          تعداد
                        </InputLabel>

                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          value={qty}
                          onChange={(e) => {
                            setQty(e.target.value);
                          }}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}

                    <Box my={2}>
                      <Button
                        variant='contained'
                        color='primary'
                        className={classes.button}
                        startIcon={<AddShoppingCartOutlinedIcon />}
                        onClick={() => {
                          history.push(
                            `/shopcart/${match.params.id}?qty=${qty}`
                          );
                        }}
                        disabled={
                          product.countInStock === 0 ? true : qty ? false : true
                        }
                      >
                        <Box mr={2}>افزودن به سبد خرید</Box>
                      </Button>
                    </Box>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {product.reviews?.length !== 0 && (
              <Grid item xs={12} sm={12} md={8}>
                <Card>
                  <Typography variant='body2' component='div'>
                    <Box
                      p={2}
                      display='flex'
                      flexDirection='column'
                      justifyContent='space-between'
                    >
                      <div>نظرات کاربران :</div>
                      {product.reviews?.map((review) => (
                        <Box
                          key={review._id}
                          my={3}
                          mx={2}
                          display='flex'
                          flexDirection='column'
                          justifyContent='space-between'
                        >
                          <Box
                            display='flex'
                            alignItems='center'
                            color='primary.main'
                            mb={1}
                          >
                            <Avatar>{review.name.slice(0, 1)}</Avatar>
                            <Box ml={1}>{review.name} </Box>
                            <Box ml={1}>{review?.createdAt?.slice(0, 10)} </Box>
                          </Box>
                          <Raiting value={review.rating} />
                          <Divider light />
                          <Box mt={2}>{review.comment} </Box>
                        </Box>
                      ))}
                    </Box>
                  </Typography>
                </Card>
              </Grid>
            )}

            <Grid item xs={12} sm={12} md={8}>
              <Card>
                <Typography variant='body2' component='div' paragraph={true}>
                  <Box
                    p={2}
                    style={{ minHeight: '200px' }}
                    display='flex'
                    flexDirection='column'
                    justifyContent='space-between'
                  >
                    <div>امتیاز دهی محصول :</div>
                    {ratingError && (
                      <Box py={1}>
                        <Alert severity='error'>{ratingError}</Alert>
                      </Box>
                    )}
                    <Box display='flex' justifyContent='start'>
                      <Rating
                        name='hover-feedback'
                        value={rateVal}
                        precision={0.5}
                        icon={<StarIcon fontSize='inherit' />}
                        onChange={(event, newValue) => {
                          setRateVal(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                          setHover(newHover);
                        }}
                      />
                      {rateVal !== null && (
                        <Box ml={2}>
                          {labels[hover !== -1 ? hover : rateVal]}
                        </Box>
                      )}
                    </Box>

                    <TextField
                      label='نظر شما : '
                      variant='outlined'
                      multiline
                      fullWidth
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    />

                    <Button
                      variant='outlined'
                      color='primary'
                      onClick={() => {
                        setRatingError('');
                        if (comment && rateVal !== -1) {
                          dispatch(
                            setReview(product._id, { rating: rateVal, comment })
                          );
                        } else {
                          setRatingError(EMPTY_FIELD_EXIST);
                        }
                      }}
                    >
                      ثبت نظر
                    </Button>
                  </Box>
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default ProductScreen;
