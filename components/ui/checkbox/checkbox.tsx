'use client';

import type { ComponentPropsWithRef } from 'react';
import { tv } from 'tailwind-variants';

const checkboxVariants = tv({
  base: [
    'border border-gray-200 bg-gray-50',
    'size-4 shrink-0 rounded-md',
    'flex items-center justify-center',
  ],
  variants: {
    selected: {
      true: 'border-blue-600 bg-blue-600',
      false: '',
    },
    disabled: {
      true: 'cursor-not-allowed opacity-50',
      false: '',
    },
  },
  defaultVariants: {
    selected: false,
    disabled: false,
  },
});

export type CheckboxProps = {
  selected?: boolean;
  disabled?: boolean;
} & Omit<ComponentPropsWithRef<'div'>, 'className'>;

export const Checkbox = ({ selected = false, disabled = false, ...rest }: CheckboxProps) => {
  const className = checkboxVariants({ selected, disabled });

  return (
    <div
      {...rest}
      className={className}
      role='checkbox'
      aria-checked={selected}
      aria-disabled={disabled}
    >
      {selected && (
        <svg
          width='10'
          height='8'
          viewBox='0 0 10 8'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
        >
          <path
            d='M1 4L3.5 6.5L9 1'
            stroke='white'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )}
    </div>
  );
};
