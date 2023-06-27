import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useRecordContext} from 'react-admin';
import Button from '@mui/material/Button';

const DuplicatePlanButton = () => {
  const record = useRecordContext();
  const {id, lastupdate, createdate, createdby, updatedby, ...rest} = record;
  const navigate = useNavigate();
  return (
    <Button
      onClick={async () => {
        navigate(
          `/plans/create?source=${encodeURIComponent(JSON.stringify(rest))}`,
        );
      }}
      variant="contained"
      color="primary"
      style={{marginTop: 20}}>
      Duplicate
    </Button>
  );
};

export default DuplicatePlanButton;
