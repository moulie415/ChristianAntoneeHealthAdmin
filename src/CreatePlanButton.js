import {Button} from '@material-ui/core';
import {collection, addDoc} from 'firebase/firestore';
import {toast} from 'react-toastify';
import {db} from './App';

const CreatePlanButton = ({loading, setLoading, history, ...props}) => {
  const {id, planStatus} = props.record;
  return planStatus === 2 ? (
    <Button
      onClick={async () => {
        try {
          setLoading(true);
          const ref = await addDoc(collection(db, 'plans'), {
            user: id,
            lastupdate: new Date(),
            createdate: new Date(),
          });
          history.push(`/plans/${ref.id}`);
          setLoading(false);
        } catch (e) {
          console.log(e);
          setLoading(false);
          toast.error('Error creating plan');
        }
      }}
      disabled={loading}
      variant="contained"
      color="primary"
      style={{marginTop: 10}}>
      Create plan
    </Button>
  ) : null;
};

export default CreatePlanButton;
