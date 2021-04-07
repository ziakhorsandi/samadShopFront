import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Product from '../components/Product';
import { makeStyles } from '@material-ui/core/styles';
import products from '../products';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  gridItem: {
    display: 'grid',
    placeItems: 'center',
  },
  title: {
    margin: '2rem 0',
  },
});

const HomeScreen = () => {
  const classes = useStyles();

  return (
    <Container maxWidth='xl'>
      <Typography
        align='right'
        component='h1'
        variant='h5'
        color='textSecondary'
        className={classes.title}
      >
        جدید ترین محصولات :
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid
            key={product._id}
            className={classes.gridItem}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
          >
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomeScreen;
