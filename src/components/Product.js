import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Raiting from './Raiting';
import teal from '@material-ui/core/colors/teal';

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

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.img}
          component='img'
          alt='Contemplative Reptile'
          height='140'
          image={product.image}
        />
        <CardContent>
          <Typography gutterBottom variant='h6' component='h2' align='right'>
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
            {/* {product.numReviews} از {product.rating} */}
            <Raiting
              value={product.rating}
              txt={`از ${product.numReviews} بازدید`}
            />
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
