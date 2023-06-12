import Button from '@mui/material/Button';
import {collection, addDoc} from 'firebase/firestore';
import {toast} from 'react-toastify';
import {db} from './App';
import {useRecordContext} from 'react-admin';
import {useNavigate} from 'react-router-dom';

const CreatePlanButton = ({loading, setLoading}) => {
  const record = useRecordContext();
  const navigate = useNavigate();
  const {id, client} = record;
  if (!client) return false;
  return (
    <Button
      onClick={async () => {
        navigate(`/plans/create?source={"user":"${id}"}`);
      }}
      disabled={loading}
      variant="contained"
      color="primary"
      style={{marginTop: 10}}>
      Create plan
    </Button>
  );
};

export default CreatePlanButton;
