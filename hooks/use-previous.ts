import { useState } from 'react';

export const usePrevious = <T>(value: T) => {
  const [current, setCurrent] = useState<T>(value);
  const [previous, setPrevious] = useState<T | null>(null);

  if (current !== value) {
    setPrevious(current);
    setCurrent(value);
  }

  return previous;
};
