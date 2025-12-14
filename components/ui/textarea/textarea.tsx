/**
 * Generic Textarea component
 *
 * React 19 compatible with type-safe react-hook-form integration.
 */

'use client';

import type { ComponentPropsWithRef } from 'react';
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { tv, type VariantProps } from 'tailwind-variants';

export const textareaVariants = tv({
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
    'resize-y',
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
    flex: {
      true: 'flex-1',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    error: false,
    disabled: false,
    flex: false,
  },
});

export type TextareaProps = Omit<ComponentPropsWithRef<'textarea'>, 'className'> &
  VariantProps<typeof textareaVariants>;

/**
 * Textarea component (basic)
 *
 * @example
 * // Basic usage
 * <Textarea placeholder="Enter text" rows={4} />
 *
 * @example
 * // With register spread
 * const { register } = useForm()
 * <Textarea {...register('description')} placeholder="Enter description" />
 *
 * @example
 * // Error state
 * <Textarea error placeholder="Enter comment" />
 */
export const Textarea = ({
  size,
  error,
  disabled,
  flex,
  rows = 4,
  ref,
  ...rest
}: TextareaProps) => {
  const className = textareaVariants({ size, error, disabled, flex });

  return (
    <textarea
      ref={ref}
      rows={rows}
      className={className}
      disabled={disabled}
      aria-invalid={error}
      {...rest}
    />
  );
};

// React Hook Form integration type
type TextareaWithRHFProps<T extends FieldValues> = {
  name: Path<T>;
  register: UseFormRegister<T>;
} & Omit<TextareaProps, 'name' | 'onChange' | 'onBlur' | 'ref'>;

/**
 * TextareaWithRHF - React Hook Form integration component
 *
 * Type-safe integration with react-hook-form.
 * Form types are auto-inferred from register, no generics needed.
 *
 * @example
 * type FormData = {
 *   description: string;
 *   comment: string;
 * }
 *
 * const { register } = useForm<FormData>()
 *
 * // No generics needed! Auto-inferred from register
 * <TextareaWithRHF
 *   name="description"  // <- type inference works
 *   register={register}
 *   placeholder="Enter description"
 * />
 */
export const TextareaWithRHF = <T extends FieldValues>({
  name,
  register,
  ...props
}: TextareaWithRHFProps<T>) => <Textarea {...props} {...register(name)} />;
