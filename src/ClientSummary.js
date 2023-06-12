import {collection, getDocs, query, where} from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import {db} from './App';
import {toast} from 'react-toastify';
import {CircularProgress} from '@mui/material';

function chunkArrayInGroups(arr, size) {
  var myArray = [];
  for (var i = 0; i < arr.length; i += size) {
    myArray.push(arr.slice(i, i + size));
  }
  return myArray;
}

const ClientSummary = () => {
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState();

  const getClients = async () => {
    try {
      setLoading(true);
      const clientQuery = query(
        collection(db, 'users'),
        where('client', '==', true),
      );
      const c = await getDocs(clientQuery);
      const clientUids = c.docs.map(doc => doc.data().uid);
      const uidArrays = chunkArrayInGroups(clientUids, 10);
      const plans = [];
      for (let i = 0; i < uidArrays.length; i++) {
        const arr = uidArrays[i];
        const planQuery = query(
          collection(db, 'plans'),
          where('user', 'in', arr),
        );
        const snapshot = await getDocs(planQuery);
        plans.push(...snapshot.docs.map(doc => doc.data()));
      }

      setClients(
        c.docs.map(doc => {
          const data = doc.data();
          const cPlans = plans.filter(plan => plan.user === data.uid);
          return {...data, plans: cPlans};
        }),
      );
    } catch (e) {
      toast.error('Error fetching clients: ' + e.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    getClients();
  }, []);

  console.log(clients);

  return (
    <div>
      {loading ? (
        <div
          style={{
            height: '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CircularProgress />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ClientSummary;
