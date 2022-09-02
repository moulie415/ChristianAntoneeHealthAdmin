import React from 'react';
import {collection, addDoc} from 'firebase/firestore';
import {toast} from 'react-toastify';
import {db} from './App';
import {useNavigate} from 'react-router-dom';
import {useRecordContext} from 'react-admin';
import Button from '@mui/material/Button';

const DuplicatePlanButton = ({loading, setLoading}) => {
  const record = useRecordContext();
  const {id, ...rest} = record;
  const navigate = useNavigate();
  return (
    <Button
      onClick={async () => {
        try {
          setLoading(true);
          const ref = await addDoc(collection(db, 'plans'), {
            ...rest,
            lastupdate: new Date(),
            createdate: new Date(),
          });
          navigate(`/plans/${ref.id}`);
          setLoading(false);
        } catch (e) {
          setLoading(false);
          toast.error('Error creating plan');
        }
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
