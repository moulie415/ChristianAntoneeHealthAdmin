import {Chip} from '@mui/material';
import React from 'react';

const SimpleChipField = ({record}) => {
  return record ? (
    <span
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}>
      <Chip key={record} style={{margin: 4}} label={record} />
    </span>
  ) : null;
};

SimpleChipField.defaultProps = {
  addLabel: true,
};

export default SimpleChipField;
