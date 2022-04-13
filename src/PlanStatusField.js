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
  return props.record ? (
    <span>{getString(props.record.planStatus)}</span>
  ) : null;
};

export default PlanStatusField;
