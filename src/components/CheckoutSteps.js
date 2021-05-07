import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Paper, Tab, Tabs } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const CheckoutSteps = (props) => {
  const { step1, step2, step3, step4 } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(Object.keys(props).length - 1);
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        centered
      >
        {step1 ? (
          <Tab
            label='گام اول'
            onClick={() => {
              history.push('/users/login');
            }}
          />
        ) : (
          <Tab label='گام اول' disabled />
        )}
        {step2 ? (
          <Tab
            label='گام دوم'
            onClick={() => {
              history.push('/shipping');
            }}
          />
        ) : (
          <Tab label='گام دوم' disabled />
        )}
        {step3 ? (
          <Tab
            label='گام سوم'
            onClick={() => {
              history.push('/payment');
            }}
          />
        ) : (
          <Tab label='گام سوم' disabled />
        )}
        {step4 ? (
          <Tab
            label='گام چهارم'
            onClick={() => {
              history.push('/login');
            }}
          />
        ) : (
          <Tab label='گام چهارم' disabled />
        )}
      </Tabs>
    </Paper>
  );
};

export default CheckoutSteps;
