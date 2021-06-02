import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../store/products';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {
  ButtonBase,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  img: {
    // objectFit: 'cover',
    objectFit: 'contain',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '300px',
    },
    maxWidth: '400px',
  },

  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const ProductCarousel = () => {
  const { topRated } = useSelector(selectAllProducts);

  const history = useHistory();
  const classes = useStyles();

  return (
    <div style={{ direction: 'ltr', width: '100%', margin: '1rem 0 ' }}>
      <Carousel
        showStatus={false}
        dynamicHeight
        showThumbs={false}
        onClickItem={(index, item) => {
          history.push(`/product/${item.key}`);
        }}
      >
        {topRated?.map((item) => (
          <ButtonBase
            focusRipple
            key={item._id}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              width: '100%',
            }}
          >
            <CardMedia
              className={classes.img}
              component='img'
              alt='...'
              src={`${process.env.REACT_APP_SERVER_URL}${item.image}`}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component='span'
                variant='subtitle1'
                color='inherit'
                className={classes.imageTitle}
              >
                {item.name}
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
