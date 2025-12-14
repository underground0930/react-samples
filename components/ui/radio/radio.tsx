'use client';

import { useId, type ComponentPropsWithRef, type ReactNode } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { tv } from 'tailwind-variants';

// ========================================
// Styles
// ========================================

export const radioVariants = tv({
  slots: {
    base: [
      'relative inline-flex size-4 shrink-0 items-center justify-center',
      'rounded-full border border-gray-200 bg-gray-50',
      'has-disabled:cursor-not-allowed has-disabled:opacity-50',
    ],
    input: 'peer absolute inset-0 opacity-0 disabled:cursor-not-allowed',
    indicator: 'hidden size-2.5 rounded-full bg-blue-600 peer-checked:block',
    label: 'flex cursor-pointer items-center gap-1',
    labelText: 'text-sm text-gray-900',
  },
});

// ========================================
// Types
// ========================================

export type RadioProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'className'>;

// ========================================
// Components
// ========================================

export const Radio = ({ ref, ...rest }: RadioProps) => {
  const styles = radioVariants();

  return (
    <span className={styles.base()}>
      <input type='radio' ref={ref} className={styles.input()} {...rest} />
      <span className={styles.indicator()} />
    </span>
  );
};

// Radio with label component
export type RadioWithLabelProps = RadioProps & {
  label: ReactNode;
};

export const RadioWithLabel = ({ label, id, ref, ...rest }: RadioWithLabelProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const styles = radioVariants();

  return (
    <label htmlFor={inputId} className={styles.label()}>
      <Radio ref={ref} id={inputId} {...rest} />
      <span className={styles.labelText()}>{label}</span>
    </label>
  );
};

// ========================================
// React Hook Form Integration
// ========================================

export type RadioOption = {
  label: ReactNode;
  value: string;
};

type RadioGroupWithRHFProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  options: RadioOption[];
  disabled?: boolean;
};

/**
 * RadioGroupWithRHF - React Hook Form integration component
 *
 * @example
 * type FormData = {
 *   shareTarget: string;
 * }
 *
 * const { control } = useForm<FormData>()
 *
 * <RadioGroupWithRHF
 *   name="shareTarget"
 *   control={control}
 *   options={[
 *     { label: 'Project', value: 'project' },
 *     { label: 'Private', value: 'private' },
 *   ]}
 * />
 */
export const RadioGroupWithRHF = <T extends FieldValues>({
  name,
  control,
  options,
  disabled,
}: RadioGroupWithRHFProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <div className='flex items-center gap-4'>
        {options.map((option) => (
          <RadioWithLabel
            key={option.value}
            label={option.label}
            value={option.value}
            checked={field.value === option.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            disabled={disabled}
          />
        ))}
      </div>
    )}
  />
);
