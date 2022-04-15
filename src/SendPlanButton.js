import {Button} from '@material-ui/core';
import React from 'react';

const SendPlanButton = ({onClick, sent, loading}) => {
  return (
    <Button
      onClick={onClick}
      disabled={sent || loading}
      variant="contained"
      color="primary">
      Send
    </Button>
  );
};

export default SendPlanButton;
