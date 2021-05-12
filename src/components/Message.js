import React from 'react';
import Alert from '@material-ui/lab/Alert';

const Message = ({ msg }) => {
  return (
    <div style={{ height: '90%', display: 'grid', placeItems: 'center' }}>
      {/* <div style={{ display: 'grid', placeItems: 'center' }}> */}
      <Alert severity='error'>{msg}</Alert>
    </div>
  );
};

export default Message;
