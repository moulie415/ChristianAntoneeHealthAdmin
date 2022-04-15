const PlanStatusField = props => {
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

  return props.record ? (
    <span
      style={{
        color: getColor(props.record.planStatus),
        fontWeight: props.record.planStatus === 2 ? 'bold' : 'normal',
      }}>
      {getString(props.record.planStatus)}
    </span>
  ) : null;
};

export default PlanStatusField;
