import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from '@storybook/test';
import { Plus, Download, Filter, ChevronDown, Sparkles } from 'lucide-react';

import { Button } from './button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// プライマリーボタン
export const Primary: Story = {
  args: {
    children: '新規候補者の追加',
    variant: 'primary',
    iconLeft: <Plus className='size-4' />,
  },
};

// セカンダリーボタン
export const Secondary: Story = {
  args: {
    children: 'サンプルCSVダウンロード',
    variant: 'secondary',
    iconLeft: <Download className='size-4' />,
  },
};

// ゴーストボタン
export const Ghost: Story = {
  args: {
    children: 'キャンセル',
    variant: 'ghost',
  },
};

// quietボタン
export const Quiet: Story = {
  args: {
    children: 'フィルタをクリア',
    variant: 'quiet',
  },
};

// エラーボタン
export const Error: Story = {
  args: {
    children: '削除',
    variant: 'error',
  },
};

// アイコン右側
export const RightIcon: Story = {
  args: {
    children: '新規候補者の追加',
    variant: 'primary',
    iconRight: <Plus className='size-4' />,
  },
};

// フィルターボタン(左右にアイコンがある)
export const FilterButton1: Story = {
  args: {
    children: '保存したフィルター',
    variant: 'secondary',
    iconLeft: <Filter className='size-4' />,
    iconRight: <ChevronDown className='size-4' />,
  },
};

// フィルターボタン(左右にアイコンがある、テキストなし)
export const FilterButton2: Story = {
  args: {
    variant: 'secondary',
    iconLeft: <Filter className='size-4' />,
    iconRight: <ChevronDown className='size-4' />,
  },
};

// アイコンなし
export const WithoutIcon: Story = {
  args: {
    children: 'ボタン',
    variant: 'primary',
  },
};

// Disabled状態
export const DisabledPrimary: Story = {
  args: {
    children: '無効なボタン',
    variant: 'primary',
    disabled: true,
  },
};

export const DisabledSecondary: Story = {
  args: {
    children: '無効なボタン',
    variant: 'secondary',
    disabled: true,
  },
};

export const DisabledGhost: Story = {
  args: {
    children: '無効なボタン',
    variant: 'ghost',
    disabled: true,
  },
};

// Next.js Linkとして
export const AsNextLink: Story = {
  args: {
    as: 'link',
    href: '/dashboard',
    children: 'ダッシュボードへ',
    variant: 'primary',
  },
};

// aタグとして（外部リンク）
export const AsAnchor: Story = {
  args: {
    as: 'a',
    href: 'https://example.com',
    children: '外部リンク',
    variant: 'secondary',
  },
};

// Linkでdisabled
export const AsNextLinkDisabled: Story = {
  args: {
    as: 'link',
    href: '/dashboard',
    children: '無効なリンク',
    variant: 'primary',
    disabled: true,
  },
};

// aタグでdisabled
export const AsAnchorDisabled: Story = {
  args: {
    as: 'a',
    href: 'https://example.com',
    children: '無効な外部リンク',
    variant: 'secondary',
    disabled: true,
  },
};

// クリックイベント付き
export const WithClickEvent: Story = {
  args: {
    children: 'クリック',
    variant: 'primary',
    onClick: fn(),
  },
};

// サイズバリエーション
export const Sizes: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <Button variant='primary' size='xs'>
        サイズ: XS
      </Button>
      <Button variant='primary' size='sm'>
        サイズ: SM
      </Button>
    </div>
  ),
};

// 全幅ボタン
export const FullWidth: Story = {
  render: () => (
    <div className='w-[300px]'>
      <Button variant='primary' fullWidth>
        全幅ボタン
      </Button>
    </div>
  ),
};
