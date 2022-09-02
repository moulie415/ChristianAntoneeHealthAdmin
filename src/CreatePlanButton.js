import Button from '@mui/material/Button';
import {collection, addDoc} from 'firebase/firestore';
import {toast} from 'react-toastify';
import {db} from './App';
import {useRecordContext} from 'react-admin';
import {useNavigate} from 'react-router-dom';

const CreatePlanButton = ({loading, setLoading}) => {
  const record = useRecordContext();
  const navigate = useNavigate();
  const {id, planStatus} = record;
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
      style={{marginTop: 10}}>
      Create plan
    </Button>
  ) : null;
};

export default CreatePlanButton;
