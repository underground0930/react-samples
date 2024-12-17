import { useState } from 'react';
import { Sample } from './Sample';
export const Wrapper = () => {
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <button onClick={() => setIsShow(!isShow)}>
          {isShow ? 'Show' : 'Hide'}
        </button>
      </div>
      {isShow && <Sample />}
    </>
  );
};
