import Button from '@mui/material/Button';
import {useRecordContext} from 'react-admin';
import {useNavigate} from 'react-router-dom';

const CreatePlanButton = () => {
  const record = useRecordContext();
  const navigate = useNavigate();
  const {id, client} = record;
  if (!client) return false;
  return (
    <Button
      onClick={async () => {
        navigate(`/plans/create?source={"user":"${id}"}`);
      }}
      variant="contained"
      color="primary"
      style={{marginTop: 10}}>
      Create plan
    </Button>
  );
};

export default CreatePlanButton;
