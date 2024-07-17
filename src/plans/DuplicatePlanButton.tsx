import Button from '@mui/material/Button';
import {useRecordContext} from 'react-admin';
import {useNavigate} from 'react-router-dom';
import {Plan} from '../types/Shared';

const DuplicatePlanButton = () => {
  const record = useRecordContext<Plan>();

  const navigate = useNavigate();
  return (
    <Button
      onClick={async () => {
        if (record) {
          const {id, lastupdate, createdate, createdby, updatedby, ...rest} =
            record;
          navigate(
            `/plans/create?source=${encodeURIComponent(JSON.stringify(rest))}`,
          );
        }
      }}
      variant="contained"
      color="primary"
      style={{marginTop: 20}}>
      Duplicate
    </Button>
  );
};

export default DuplicatePlanButton;
