import {useRecordContext} from 'react-admin';

const PlanStatusField = props => {
  const record = useRecordContext();
  const getString = status => {
    if (status === 3) {
      return 'Complete';
    }
    if (status === 2) {
      return 'Pending';
    }
    return 'Uninitialized';
  };
  const getColor = status => {
    if (status === 3) {
      return 'green';
    }
    if (status === 2) {
      return 'red';
    }
    return 'Uninitialized';
  };

  return record ? (
    <span
      style={{
        color: getColor(ecord.planStatus),
        fontWeight: record.planStatus === 2 ? 'bold' : 'normal',
      }}>
      {getString(record.planStatus)}
    </span>
  ) : null;
};

export default PlanStatusField;
