import React from 'react';
import {collection, addDoc} from 'firebase/firestore';
import {toast} from 'react-toastify';
import {db} from './App';
import {Button} from '@material-ui/core';

const DuplicatePlanButton = ({loading, setLoading, history, ...props}) => {
  const {id, ...rest} = props.record;
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
          history.push(`/plans/${ref.id}`);
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
