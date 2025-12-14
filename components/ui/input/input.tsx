/**
 * Generic Input component
 *
 * React 19 compatible with type-safe react-hook-form integration.
 */

'use client';

import type { ComponentPropsWithRef } from 'react';
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { tv, type VariantProps } from 'tailwind-variants';

export const inputVariants = tv({
  base: [
    'w-full',
    'bg-gray-50',
    'focus:bg-white',
    'rounded-lg',
    'font-normal',
    'transition-colors',
    'border border-transparent',
    'hover:border-blue-500',
    'focus:border-blue-500',
    'placeholder:text-gray-400',
    'text-gray-900',
    'focus:outline-none',
  ],
  variants: {
    size: {
      sm: 'rounded-md px-2.5 py-1.5 text-xs leading-5',
      md: 'px-3 py-2 text-sm leading-6',
      lg: 'px-4 py-3 text-base leading-6',
    },
    error: {
      true: 'border-red-500 hover:border-red-500 focus:border-red-500',
      false: '',
    },
    disabled: {
      true: 'cursor-not-allowed opacity-50 hover:border-transparent',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    error: false,
    disabled: false,
  },
});

export type Props = Omit<ComponentPropsWithRef<'input'>, 'className' | 'size'> &
  VariantProps<typeof inputVariants>;

/**
 * Input component (basic)
 *
 * @example
 * // Basic usage
 * <Input placeholder="Enter text" />
 *
 * @example
 * // With register spread
 * const { register } = useForm()
 * <Input {...register('name')} placeholder="Enter name" />
 *
 * @example
 * // Error state
 * <Input error placeholder="Enter email" />
 */
export const Input = ({ size, error, disabled, type = 'text', ref, ...rest }: Props) => {
  const className = inputVariants({ size, error, disabled });

  return (
    <input
      ref={ref}
      type={type}
      className={className}
      disabled={disabled}
      aria-invalid={error}
      {...rest}
    />
  );
};

// React Hook Form integration type
type InputWithRHFProps<T extends FieldValues> = {
  name: Path<T>;
  register: UseFormRegister<T>;
} & Omit<Props, 'name' | 'onChange' | 'onBlur' | 'ref'>;

/**
 * InputWithRHF - React Hook Form integration component
 *
 * Type-safe integration with react-hook-form.
 * Form types are auto-inferred from register, no generics needed.
 *
 * @example
 * type FormData = {
 *   email: string;
 *   password: string;
 * }
 *
 * const { register } = useForm<FormData>()
 *
 * // No generics needed! Auto-inferred from register
 * <InputWithRHF
 *   name="email"  // <- type inference works
 *   register={register}
 *   placeholder="Email"
 * />
 */
export const InputWithRHF = <T extends FieldValues>({
  name,
  register,
  ...props
}: InputWithRHFProps<T>) => <Input {...props} {...register(name)} />;
