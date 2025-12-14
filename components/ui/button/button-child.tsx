import type React from 'react';

type Props = {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
};

export const ButtonChild = ({ iconLeft, iconRight, children }: Props) => {
  return (
    <>
      {iconLeft}
      {children && <div className='flex items-center justify-center'>{children}</div>}
      {iconRight}
    </>
  );
};
