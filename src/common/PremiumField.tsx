import ClearIcon from '@mui/icons-material/Clear';
import {useRecordContext} from 'react-admin';

const PremiumField: React.FC<{source: string}> = props => {
  const record = useRecordContext(props);
  return (
    <span>
      {record?.premium?.[0] ? (
        Object.keys(record.premium)?.[0]
      ) : (
        <ClearIcon fontSize="small" />
      )}
    </span>
  );
};

export default PremiumField;
