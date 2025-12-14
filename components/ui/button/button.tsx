/**
 * Button component
 *
 * React 19 compatible button component.
 * Supports button, anchor, and Next.js Link rendering.
 * Simple and clean design with Tailwind standard colors.
 */

'use client';

import Link from 'next/link';
import type React from 'react';
import type { ComponentPropsWithRef } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

import { ButtonChild } from './button-child';

export const buttonVariants = tv({
  base: [
    'group inline-flex h-fit min-w-[72px] items-center justify-center gap-1',
    'text-center font-bold',
    'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
    'rounded-md',
  ],
  variants: {
    variant: {
      primary: [
        'bg-blue-600 text-white',
        'focus-visible:ring-blue-500/50',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'hover:bg-blue-700',
        'active:bg-blue-800',
        'data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50',
        'shadow-sm',
      ],
      secondary: [
        'bg-white text-gray-700',
        'focus-visible:ring-blue-500/50',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'hover:bg-gray-50',
        'active:bg-gray-100',
        'data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50',
        'border border-gray-300 shadow-sm',
      ],
      ghost: [
        'bg-transparent text-gray-700',
        'focus-visible:ring-blue-500/50',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'hover:bg-gray-100',
        'active:bg-gray-200',
        'data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50',
      ],
      error: [
        'bg-red-600 text-white',
        'focus-visible:ring-red-500/50',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'hover:bg-red-700',
        'active:bg-red-800',
        'data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50',
        'shadow-sm',
      ],
      quiet: [
        'bg-blue-50 text-blue-600',
        'focus-visible:ring-blue-500/50',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'hover:bg-blue-100',
        'active:bg-blue-200',
        'data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50',
      ],
    },
    size: {
      xs: 'rounded-[6px] px-2.5 py-1.5 text-xs leading-5',
      sm: 'rounded-[6px] px-2.5 py-2 text-sm leading-5',
    },
    fullWidth: {
      true: 'w-full',
      false: '',
    },
    disabled: {
      true: 'pointer-events-none',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'sm',
    fullWidth: false,
    disabled: false,
  },
});

// 共通プロパティ
type CommonVariantProps = VariantProps<typeof buttonVariants> & {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

// button要素用プロパティ
type ButtonElementProps = Omit<ComponentPropsWithRef<'button'>, 'className'> & {
  as?: 'button';
} & CommonVariantProps;

// a要素用プロパティ
type AnchorElementProps = Omit<ComponentPropsWithRef<'a'>, 'className'> & {
  as: 'a';
  disabled?: boolean;
} & CommonVariantProps;

// Next.js Link用プロパティ
type LinkElementProps = Omit<ComponentPropsWithRef<typeof Link>, 'className'> & {
  as: 'link';
  disabled?: boolean;
} & CommonVariantProps;

// エクスポート用の統合型
export type Props = ButtonElementProps | AnchorElementProps | LinkElementProps;

// ボタンコンポーネント
export const Button = (props: Props) => {
  const { as = 'button', children } = props;

  // a要素でレンダリング（外部リンク）
  if (as === 'a') {
    const {
      iconLeft,
      iconRight,
      variant,
      size,
      fullWidth,
      disabled,
      as: _,
      ...rest
    } = props as AnchorElementProps;
    const className = buttonVariants({ variant, size, fullWidth, disabled });
    return (
      <a
        {...rest}
        className={className}
        target='_blank'
        rel='noopener noreferrer'
        data-disabled={disabled}
      >
        <ButtonChild iconLeft={iconLeft} iconRight={iconRight}>
          {children}
        </ButtonChild>
      </a>
    );
  }

  // Next.js Linkでレンダリング（内部リンク）
  if (as === 'link') {
    const {
      iconLeft,
      iconRight,
      variant,
      size,
      fullWidth,
      disabled,
      prefetch = false,
      as: _,
      ...rest
    } = props as LinkElementProps;
    const className = buttonVariants({ variant, size, fullWidth, disabled });
    return (
      <Link {...rest} className={className} prefetch={prefetch} data-disabled={disabled}>
        <ButtonChild iconLeft={iconLeft} iconRight={iconRight}>
          {children}
        </ButtonChild>
      </Link>
    );
  }

  // button要素でレンダリング
  if (as === 'button') {
    const {
      iconLeft,
      iconRight,
      size,
      variant,
      fullWidth,
      disabled,
      as: _,
      ...rest
    } = props as ButtonElementProps;
    const className = buttonVariants({ variant, size, fullWidth, disabled });
    return (
      <button {...rest} className={className} disabled={disabled}>
        <ButtonChild iconLeft={iconLeft} iconRight={iconRight}>
          {children}
        </ButtonChild>
      </button>
    );
  }

  return null;
};
