import React, {useEffect, useState} from 'react';
import PersonIcon from '@mui/icons-material/Person';
import {collection, query, where, onSnapshot} from 'firebase/firestore';
import {db} from './App';

const UserIcon = props => {
  return <PersonIcon {...props} />;
};

export default UserIcon;
