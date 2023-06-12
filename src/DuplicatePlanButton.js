import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useRecordContext} from 'react-admin';
import Button from '@mui/material/Button';

const DuplicatePlanButton = ({loading, setLoading}) => {
  const record = useRecordContext();
  const {lastupdate, createdate, ...rest} = record;
  const navigate = useNavigate();
  return (
    <Button
      onClick={async () => {
        navigate(`/plans/create?source=${JSON.stringify(rest)}`);
      }}
      disabled={loading}
      variant="contained"
      color="primary"
      style={{marginTop: 20}}>
      Duplicate
    </Button>
  );
};

export default DuplicatePlanButton;
