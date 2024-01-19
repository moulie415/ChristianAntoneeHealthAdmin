import {useState} from 'react';

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const token = () => {
  return Math.floor((Math.random() * 10) % 10);
};

export function useForceUpdate() {
  const [value, setValue] = useState(0);
  return () => setValue(() => value + 1);
}
