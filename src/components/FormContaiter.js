import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4),
    },
    padding: theme.spacing(4, 2),
  },
}));

const FormContaiter = ({ children }) => {
  const classes = useStyles();
  return (
    <Grid container justify='center' spacing={5} className={classes.root}>
      <Grid item xs={12} md={6}>
        {children}
      </Grid>
    </Grid>
  );
};

export default FormContaiter;
