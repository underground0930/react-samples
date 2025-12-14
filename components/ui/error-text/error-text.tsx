'use client';

import type { ComponentPropsWithRef } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const errorTextVariants = tv({
  base: ['text-red-500', 'font-normal', 'mt-1'],
  variants: {
    size: {
      sm: 'text-xs leading-4',
      md: 'text-sm leading-5',
      lg: 'text-base leading-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type Props = Omit<ComponentPropsWithRef<'div'>, 'className'> &
  VariantProps<typeof errorTextVariants>;

/**
 * ErrorText component
 * For displaying error messages with form inputs
 *
 * @example
 * <Input error />
 * <ErrorText>Invalid email format</ErrorText>
 *
 * @example
 * // With react-hook-form
 * <Input {...register('email')} error={!!errors.email} />
 * {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
 */
export const ErrorText = ({ size, children, ...rest }: Props) => {
  const className = errorTextVariants({ size });

  return (
    <div {...rest} className={className} role='alert'>
      {children}
    </div>
  );
};
