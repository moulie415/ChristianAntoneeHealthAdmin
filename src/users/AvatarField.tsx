import {Avatar, SxProps} from '@mui/material';
import {FieldProps, useRecordContext} from 'react-admin';
import {Profile} from '../types/Shared';

interface Props extends FieldProps<Profile> {
  sx?: SxProps;
  size?: string;
}

const AvatarField = ({size = '25', sx}: Props) => {
  const record = useRecordContext<Profile>();
  if (!record) return null;
  return (
    <Avatar
      src={record.avatar}
      style={{width: parseInt(size, 10), height: parseInt(size, 10)}}
      sx={sx}
      alt={`${record.name} ${record.surname}`}
    />
  );
};

export default AvatarField;
