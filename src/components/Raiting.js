import React from 'react';
import StarIcon from '@material-ui/icons/StarRounded';
import StarBorderIcon from '@material-ui/icons/StarBorderRounded';
import StarHalfIcon from '@material-ui/icons/StarHalfRounded';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import teal from '@material-ui/core/colors/teal';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  rotate: {
    transform: 'matrix(-1, 0, 0, 1, 0, 0)',
  },
  txt: {
    marginRight: '1rem',
  },
});

const Raiting = ({ value, txt, color }) => {
  const classes = useStyles();
  return (
    <Grid container direction='row' justify='flex-start' alignItems='stretch'>
      <div style={{ color: color }}>
        {value >= 1 ? (
          <StarIcon />
        ) : value >= 0.5 ? (
          <StarHalfIcon className={classes.rotate} />
        ) : (
          <StarBorderIcon />
        )}
        {value >= 2 ? (
          <StarIcon />
        ) : value >= 1.5 ? (
          <StarHalfIcon className={classes.rotate} />
        ) : (
          <StarBorderIcon />
        )}
        {value >= 3 ? (
          <StarIcon />
        ) : value >= 2.5 ? (
          <StarHalfIcon className={classes.rotate} />
        ) : (
          <StarBorderIcon />
        )}
        {value >= 4 ? (
          <StarIcon />
        ) : value >= 3.5 ? (
          <StarHalfIcon className={classes.rotate} />
        ) : (
          <StarBorderIcon />
        )}
        {value >= 5 ? (
          <StarIcon />
        ) : value >= 4.5 ? (
          <StarHalfIcon className={classes.rotate} />
        ) : (
          <StarBorderIcon />
        )}
      </div>
      <Typography
        className={classes.txt}
        noWrap
        variant='button'
        component='span'
        align='center'
      >
        {txt}
      </Typography>
    </Grid>
  );
};
Raiting.defaultProps = {
  color: teal[500],
};
export default Raiting;
