import Button from '@mui/material/Button';
import {useRecordContext} from 'react-admin';
import {useNavigate} from 'react-router-dom';

const CreatePlanButton: React.FC = () => {
  const record = useRecordContext();
  const navigate = useNavigate();
  const {id} = record;

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
