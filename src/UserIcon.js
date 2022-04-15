import React, {useEffect, useState} from 'react';
import PersonIcon from '@material-ui/icons/Person';
import {collection, query, where, onSnapshot} from 'firebase/firestore';
import {db} from './App';

const UserIcon = props => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const q = query(collection(db, 'users'), where('planStatus', '==', 2));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      setCount(querySnapshot.docs.length);
    });
    return unsubscribe;
  }, []);
  return (
    <>
      <PersonIcon {...props} />
      {count > 0 && (
        <div
          style={{
            width: 15,
            height: 15,
            borderRadius: 8,
            backgroundColor: 'red',
            position: 'absolute',
            top: 5,
            left: 10,
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            fontSize: 12,
            color: '#fff',
          }}>
          {count}
        </div>
      )}
    </>
  );
};

export default UserIcon;
