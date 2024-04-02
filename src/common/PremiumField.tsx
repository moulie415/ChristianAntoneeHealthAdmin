import ClearIcon from '@mui/icons-material/Clear';
import {useRecordContext} from 'react-admin';

const PremiumField: React.FC<{source: string}> = props => {
  const record = useRecordContext(props);
  if (record?.email === 'henry.moule@gmail.com') {
    console.log(record);
  }
  return (
    <span>
      {record?.premium && Object.keys(record.premium)?.[0] ? (
        Object.keys(record?.premium)?.[0]
      ) : (
        <ClearIcon fontSize="small" />
      )}
    </span>
  );
};

export default PremiumField;
