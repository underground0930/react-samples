/**
 * Generic Select component
 *
 * React 19 compatible with type-safe react-hook-form integration.
 * Uses the same style patterns as the Input component.
 */

'use client';

import { ChevronDown } from 'lucide-react';
import type { ComponentPropsWithRef } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { tv, type VariantProps } from 'tailwind-variants';

// ========================================
// Styles
// ========================================

export const selectVariants = tv({
  slots: {
    base: 'relative',
    select: [
      'w-full',
      'appearance-none',
      'bg-gray-50',
      'focus:bg-white',
      'rounded-lg',
      'font-normal',
      'transition-colors',
      'border border-transparent',
      'hover:border-blue-500',
      'focus:border-blue-500',
      'focus:outline-none',
      'text-gray-900',
    ],
    icon: [
      'pointer-events-none',
      'absolute',
      'top-1/2',
      'right-3',
      '-translate-y-1/2',
      'text-gray-500',
    ],
  },
  variants: {
    size: {
      sm: {
        select: 'rounded-md px-2.5 py-1.5 pr-8 text-xs leading-5',
        icon: 'size-4',
      },
      md: {
        select: 'px-3 py-2 pr-10 text-sm leading-6',
        icon: 'size-5',
      },
      lg: {
        select: 'px-4 py-3 pr-12 text-base leading-6',
        icon: 'size-6',
      },
    },
    error: {
      true: {
        select: 'border-red-500 hover:border-red-500 focus:border-red-500',
      },
      false: {},
    },
    disabled: {
      true: {
        select: 'cursor-not-allowed opacity-50 hover:border-transparent',
      },
      false: {},
    },
  },
  defaultVariants: {
    size: 'md',
    error: false,
    disabled: false,
  },
});

// ========================================
// Types
// ========================================

export type SelectOption = {
  label: string;
  value: string;
};

export type Props = Omit<ComponentPropsWithRef<'select'>, 'className' | 'size'> &
  VariantProps<typeof selectVariants> & {
    /** Array of options */
    options: SelectOption[];
    /** Placeholder text */
    placeholder?: string;
  };

// ========================================
// Component
// ========================================

/**
 * Select component (basic)
 *
 * @example
 * // Basic usage
 * <Select
 *   options={[
 *     { label: 'Option 1', value: 'option1' },
 *     { label: 'Option 2', value: 'option2' },
 *   ]}
 *   placeholder="Select an option"
 * />
 *
 * @example
 * // With react-hook-form Controller
 * <Controller
 *   name="position"
 *   control={control}
 *   render={({ field }) => (
 *     <Select {...field} options={options} placeholder="Select an option" />
 *   )}
 * />
 *
 * @example
 * // Error state
 * <Select options={options} error placeholder="Select an option" />
 */
export const Select = ({
  size,
  error,
  disabled,
  options,
  placeholder,
  value,
  ref,
  ...rest
}: Props) => {
  const styles = selectVariants({ size, error, disabled });

  return (
    <div className={styles.base()}>
      <select
        ref={ref}
        className={styles.select()}
        disabled={disabled}
        aria-invalid={error}
        value={value}
        {...rest}
      >
        {placeholder && <option value=''>{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className={styles.icon()} />
    </div>
  );
};

// ========================================
// React Hook Form Integration
// ========================================

type SelectWithRHFProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
} & Omit<Props, 'name' | 'value' | 'onChange' | 'onBlur' | 'ref'>;

/**
 * SelectWithRHF - React Hook Form integration component
 *
 * Uses Controller internally for type-safe react-hook-form integration.
 *
 * @example
 * type FormData = {
 *   position: string;
 * }
 *
 * const { control } = useForm<FormData>()
 *
 * <SelectWithRHF
 *   name="position"
 *   control={control}
 *   options={positionOptions}
 *   placeholder="Select position"
 * />
 */
export const SelectWithRHF = <T extends FieldValues>({
  name,
  control,
  ...props
}: SelectWithRHFProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => <Select {...props} {...field} />}
  />
);
