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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Raiting from './../components/Raiting';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import BackIcon from '@material-ui/icons/ArrowBackRounded';
import { useHistory } from 'react-router-dom';
import { loadProduct, selectDetailProduct } from './../store/detailProduct';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './../components/Loader';
import Message from './../components/Message';

const useStyles = makeStyles((theme) => ({
  img: {
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
  const { list: product, loading, error } = useSelector(selectDetailProduct);
  const classes = useStyles();
  const history = useHistory();
  const [qty, setQty] = useState();
  useEffect(() => {
    console.log(`match.params.id`, match.params.id);
    dispatch(loadProduct(match.params.id));
  }, [dispatch, match]);
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
            <Grid item sm={7} md={8}>
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

            <Grid item sm={5} md={4}>
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
                        {/* <Box my={1} p={0.5}>
                        </Box> */}
                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          value={qty}
                          onChange={(e) => {
                            setQty(e.target.value);
                          }}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <MenuItem value={x + 1}>{x + 1}</MenuItem>
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
          </Grid>
        </Container>
      )}
    </>
  );
};

export default ProductScreen;
