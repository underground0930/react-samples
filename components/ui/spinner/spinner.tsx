import type { ComponentPropsWithRef } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

// スタイルバリアント
const spinnerVariants = tv({
  base: 'animate-spin',
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-6',
      lg: 'size-8',
      xl: 'size-12',
    },
    color: {
      primary: 'text-blue-600',
      secondary: 'text-gray-500',
      white: 'text-white',
      current: 'text-current',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
});

// Props型
export type SpinnerProps = VariantProps<typeof spinnerVariants> &
  Omit<ComponentPropsWithRef<'svg'>, 'className' | 'children'> & {
    /** アクセシビリティ用のラベル */
    label?: string;
  };

/**
 * Spinnerコンポーネント
 * ローディング状態を示すアニメーション付きスピナー
 */
export const Spinner = (props: SpinnerProps) => {
  const { size, color, label = 'Loading', ...rest } = props;

  const styles = spinnerVariants({ size, color });

  return (
    <svg
      {...rest}
      className={styles}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      role='status'
      aria-label={label}
    >
      <circle
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='3'
        strokeLinecap='round'
        strokeDasharray='47 15.7'
      />
    </svg>
  );
};
