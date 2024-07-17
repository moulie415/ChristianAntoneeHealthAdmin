import {SxProps, Typography} from '@mui/material';

import {FieldProps, useRecordContext} from 'react-admin';
import {Profile} from '../types/Shared';
import AvatarField from './AvatarField';

interface Props extends FieldProps<Profile> {
  size?: string;
  sx?: SxProps;
}

const FullNameField = (props: Props) => {
  const {size} = props;
  const record = useRecordContext<Profile>();
  return record ? (
    <Typography
      variant="body2"
      display="flex"
      flexWrap="nowrap"
      alignItems="center"
      component="div"
      sx={props.sx}>
      <AvatarField
        {...props}
        record={record}
        size={size}
        sx={{
          mr: 1,
          mt: -0.5,
          mb: -0.5,
        }}
      />
      {record.name} {record.surname}
    </Typography>
  ) : null;
};

FullNameField.defaultProps = {
  source: 'last_name' as const,
  label: 'resources.customers.fields.name',
};

export default FullNameField;
