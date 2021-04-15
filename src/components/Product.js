import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
// import Rating from '@material-ui/lab/Rating';
import Raiting from './Raiting';
import teal from '@material-ui/core/colors/teal';

import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
    width: '100%',
  },
  img: {
    objectFit: 'contain',
  },
  bg: {
    backgroundColor: teal[100],
  },
});

const Product = ({ product }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardActionArea
        onClick={() => {
          history.push(`/product/${product._id}`);
        }}
      >
        <CardMedia
          className={classes.img}
          component='img'
          alt='Contemplative Reptile'
          height='140'
          image={product.image}
        />
        <CardContent>
          <Typography gutterBottom variant='h6' component='h2'>
            {product.name}
          </Typography>
          <Typography
            noWrap
            variant='body2'
            color='textSecondary'
            component='p'
            paragraph={true}
          >
            {product.description}
          </Typography>
          <Typography noWrap variant='button' component='div' align='right'>
            <Raiting
              value={product.rating}
              txt={`از ${product.numReviews} بازدید`}
            />
            {/* <Rating
              name='half-rating-read'
              defaultValue={product.rating}
              precision={0.5}
              readOnly
            /> */}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.bg}>
        <Typography noWrap variant='button' component='div' align='right'>
          {product.price} تومان
        </Typography>
      </CardActions>
    </Card>
  );
};
export default Product;
