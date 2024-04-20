import {useEffect, useState} from 'react';
import {getSamples} from '../helpers/api';
import {Sample} from '../types/Shared';

const useGetSamples = (source: string, uid: string) => {
  const [samples, setSamples] = useState<Sample[]>([]);
  useEffect(() => {
    const fetch = async () => {
      if (source && uid) {
        const s = await getSamples(source, uid);
        setSamples(s);
      }
    };
    fetch();
  }, [source, uid]);
  return samples;
};

export default useGetSamples;
