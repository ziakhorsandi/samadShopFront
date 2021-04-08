import React from 'react';
import {
  Card,
  CardMedia,
  Grid,
  Container,
  Box,
  CardContent,
  Typography,
  Button,
} from '@material-ui/core';
import products from './../products';
import { makeStyles } from '@material-ui/core/styles';
import Raiting from './../components/Raiting';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import BackIcon from '@material-ui/icons/ArrowBackRounded';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '100%',
    // height: '30vh',
  },
  img: {
    objectFit: 'contain',
    // width: '100%',
    // height: '100%',
  },
  button: {
    margin: theme.spacing(1),
    direction: 'rtl',
  },
}));

const ProductScreen = ({ match }) => {
  const product = products.find((p) => p._id == match.params.id);
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
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
            <Card className={classes.root}>
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
                    <Typography variant='body2' component='p' paragraph={true}>
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

                  <Box my={2}>
                    <Button
                      variant='contained'
                      color='primary'
                      className={classes.button}
                      startIcon={<AddShoppingCartOutlinedIcon />}
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
    </>
  );
};

export default ProductScreen;
