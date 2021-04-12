import React from 'react';
import Alert from '@material-ui/lab/Alert';

const Loader = ({ msg }) => {
  return (
    <div style={{ height: '90%', display: 'grid', placeItems: 'center' }}>
      <Alert severity='error'>{msg}</Alert>
    </div>
  );
};

export default Loader;
