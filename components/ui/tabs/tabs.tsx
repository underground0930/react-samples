/**
 * Tabs component
 *
 * React 19 compatible tabs component using Radix UI.
 * Simple and clean design with Tailwind standard colors.
 */

'use client';

import { Tabs as TabsPrimitive } from 'radix-ui';
import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';

const tabsStyles = tv({
  slots: {
    root: 'flex flex-col',
    list: ['flex gap-1', 'border-b border-gray-200'],
    trigger: [
      'group flex items-center gap-2',
      'rounded-t-lg px-4 py-2',
      'text-sm font-medium',
      'border-b-2 border-transparent',
      'transition-colors',
      // 非アクティブ状態（デフォルト）
      'text-gray-600',
      'hover:text-gray-900',
      'hover:bg-gray-50',
      // アクティブ状態（data-state属性で制御）
      'data-[state=active]:text-blue-600',
      'data-[state=active]:border-blue-600',
      'data-[state=active]:bg-gray-50',
      // disabled状態
      'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-600',
    ],
    content: 'pt-4 outline-none',
  },
});

const styles = tabsStyles();

// Tabs (Root)
type Props = {
  children: ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  className?: string;
};

export const Tabs = ({ children, value, onValueChange, defaultValue, className }: Props) => {
  return (
    <TabsPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      className={styles.root({ className })}
    >
      {children}
    </TabsPrimitive.Root>
  );
};

// TabsList
type TabsListProps = {
  children: ReactNode;
  className?: string;
};

export const TabsList = ({ children, className }: TabsListProps) => {
  return <TabsPrimitive.List className={styles.list({ className })}>{children}</TabsPrimitive.List>;
};

// TabsTrigger
type TabsTriggerProps = {
  children: ReactNode;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
};

export const TabsTrigger = ({ children, value, icon, disabled, className }: TabsTriggerProps) => {
  return (
    <TabsPrimitive.Trigger
      value={value}
      disabled={disabled}
      className={styles.trigger({ className })}
    >
      {icon}
      {children}
    </TabsPrimitive.Trigger>
  );
};

// TabsContent
type TabsContentProps = {
  children: ReactNode;
  value: string;
  className?: string;
};

export const TabsContent = ({ children, value, className }: TabsContentProps) => {
  return (
    <TabsPrimitive.Content value={value} className={styles.content({ className })}>
      {children}
    </TabsPrimitive.Content>
  );
};
