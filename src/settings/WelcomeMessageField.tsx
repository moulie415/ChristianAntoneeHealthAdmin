import React from 'react';
import {TextField, TextFieldProps, useRecordContext} from 'react-admin';

const WelcomeMessageField: React.FC<TextFieldProps> = props => {
  const record = useRecordContext();

  const previewMessage = record?.welcomeMessage?.replaceAll(
    '{{name}}',
    'Nigel',
  );

  return (
    <div>
      <TextField source="welcomeMessage" {...props} />
      <div style={{fontStyle: 'italic', marginTop: 10, marginBottom: 20}}>
        Example: {previewMessage}
      </div>
    </div>
  );
};

export default WelcomeMessageField;
