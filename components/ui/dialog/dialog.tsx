/**
 * Dialog component
 *
 * React 19 compatible dialog component using Radix UI.
 * Simple and clean design with Tailwind standard colors.
 * Fade animation only (no scale).
 */

'use client';

import { X } from 'lucide-react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn } from '@/libs/cn';

// ========================================
// Styles
// ========================================

const dialogStyles = tv({
  slots: {
    overlay: [
      'fixed inset-0 z-50',
      'bg-gray-900/50',
      'data-[state=open]:[animation:dialog-overlay-show_150ms_ease-out]',
      'data-[state=closed]:[animation:dialog-overlay-hide_150ms_ease-in]',
      'data-[state=closed]:pointer-events-none',
    ],
    content: [
      'fixed top-1/2 left-1/2 z-50',
      '-translate-x-1/2 -translate-y-1/2',
      'rounded-lg bg-white shadow-xl',
      'max-h-[90vh] w-[calc(100%-2rem)]',
      'overflow-hidden',
      'data-[state=open]:[animation:dialog-content-show_150ms_ease-out]',
      'data-[state=closed]:[animation:dialog-content-hide_150ms_ease-in]',
      'data-[state=closed]:pointer-events-none',
    ],
    header: ['px-6 pt-6 pb-4'],
    title: ['text-xl font-bold text-gray-900'],
    closeButton: [
      'absolute top-4 right-4',
      'rounded-md p-2',
      'text-gray-500',
      'hover:bg-gray-100 active:bg-gray-200',
      'focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:outline-none',
      'transition-colors',
    ],
    body: ['overflow-y-auto px-6 py-4', 'max-h-[calc(90vh-120px)]'],
  },
  variants: {
    size: {
      sm: { content: 'max-w-[420px]' },
      md: { content: 'max-w-[500px]' },
      lg: { content: 'max-w-[600px]' },
      full: { content: 'max-w-[700px]' },
      xl: { content: 'max-w-[1200px]' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// ========================================
// Dialog (Root)
// ========================================

type DialogProps = {
  children: ReactNode;
  /** Controlled: 外部でopen状態を管理 */
  open?: boolean;
  /** Controlled: open状態の変更ハンドラ */
  onOpenChange?: (open: boolean) => void;
  /** デフォルトのopen状態（Uncontrolled時のみ） */
  defaultOpen?: boolean;
};

export const Dialog = ({ children, open, onOpenChange, defaultOpen = false }: DialogProps) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen} modal>
      {children}
    </DialogPrimitive.Root>
  );
};

// ========================================
// DialogTrigger
// ========================================

type DialogTriggerProps = {
  children: ReactNode;
};

export const DialogTrigger = ({ children }: DialogTriggerProps) => {
  return <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>;
};

// ========================================
// DialogContent
// ========================================

type DialogContentProps = VariantProps<typeof dialogStyles> & {
  children: ReactNode;
};

export const DialogContent = ({ children, size }: DialogContentProps) => {
  const styles = dialogStyles({ size });
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={styles.overlay()} />
      <DialogPrimitive.Content className={styles.content()} aria-describedby={undefined}>
        <DialogPrimitive.Close asChild>
          <button
            ref={closeButtonRef}
            type='button'
            className={styles.closeButton()}
            aria-label='閉じる'
          >
            <X className='size-5' />
          </button>
        </DialogPrimitive.Close>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
};

// ========================================
// DialogTitle
// ========================================

type DialogTitleProps = {
  children: ReactNode;
  className?: string;
};

export const DialogTitle = ({ children, className }: DialogTitleProps) => {
  const styles = dialogStyles();
  return (
    <DialogPrimitive.Title asChild>
      <div className={styles.header()}>
        <h2 className={cn(styles.title(), className)}>{children}</h2>
      </div>
    </DialogPrimitive.Title>
  );
};

// ========================================
// DialogBody
// ========================================

type DialogBodyProps = {
  children: ReactNode;
};

export const DialogBody = ({ children }: DialogBodyProps) => {
  const styles = dialogStyles();
  return <div className={styles.body()}>{children}</div>;
};

// ========================================
// DialogClose
// ========================================

type DialogCloseProps = {
  children: ReactNode;
};

export const DialogClose = ({ children }: DialogCloseProps) => {
  return <DialogPrimitive.Close asChild>{children}</DialogPrimitive.Close>;
};
