import React from 'react';
import {TextInput, TextInputProps, useInput} from 'react-admin';

const WelcomeMessageInput: React.FC<TextInputProps> = props => {
  const {field} = useInput(props);

  const previewMessage = field.value?.replace('{{name}}', 'Nigel');

  return (
    <div>
      <TextInput multiline fullWidth {...props} />
      <div style={{fontStyle: 'italic'}}>Preview: {previewMessage}</div>
    </div>
  );
};

export default WelcomeMessageInput;
