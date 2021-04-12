import React from 'react';
import { CircularProgress } from '@material-ui/core';

const Loader = () => {
  return (
    <div style={{ height: '90%', display: 'grid', placeItems: 'center' }}>
      <CircularProgress
        color='primary'
        style={{ width: '100px', height: '100px' }}
      />
    </div>
  );
};

export default Loader;
