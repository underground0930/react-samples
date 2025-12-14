import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Spinner } from './spinner';

const meta = {
  title: 'UI/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'white', 'current'],
    },
    label: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的な使用例
export const Basic: Story = {
  args: {
    size: 'md',
    color: 'primary',
  },
};

// サイズ一覧
export const Sizes = {
  render: () => (
    <div className='flex items-center gap-4'>
      <div className='flex flex-col items-center gap-2'>
        <Spinner size='sm' />
        <span className='text-xs text-gray-500'>sm</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Spinner size='md' />
        <span className='text-xs text-gray-500'>md</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Spinner size='lg' />
        <span className='text-xs text-gray-500'>lg</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Spinner size='xl' />
        <span className='text-xs text-gray-500'>xl</span>
      </div>
    </div>
  ),
};

// カラー一覧
export const Colors = {
  render: () => (
    <div className='flex items-center gap-4'>
      <div className='flex flex-col items-center gap-2'>
        <Spinner color='primary' />
        <span className='text-xs text-gray-500'>primary</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Spinner color='secondary' />
        <span className='text-xs text-gray-500'>secondary</span>
      </div>
      <div className='flex flex-col items-center gap-2 rounded bg-gray-800 p-2'>
        <Spinner color='white' />
        <span className='text-xs text-white'>white</span>
      </div>
      <div className='flex flex-col items-center gap-2 text-green-600'>
        <Spinner color='current' />
        <span className='text-xs'>current</span>
      </div>
    </div>
  ),
};

// ボタン内での使用例
export const InButton = {
  render: () => (
    <div className='flex gap-4'>
      <button
        type='button'
        className='inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white'
        disabled
      >
        <Spinner size='sm' color='white' />
        Loading...
      </button>
      <button
        type='button'
        className='inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2'
        disabled
      >
        <Spinner size='sm' color='primary' />
        Submitting...
      </button>
    </div>
  ),
};

// ページローディング
export const PageLoading = {
  render: () => (
    <div className='flex min-h-[200px] flex-col items-center justify-center gap-4'>
      <Spinner size='xl' />
      <span className='text-sm text-gray-500'>Loading data...</span>
    </div>
  ),
};

// カード内でのローディング
export const InCard = {
  render: () => (
    <div className='flex min-h-[150px] w-[300px] items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm'>
      <div className='flex flex-col items-center gap-2'>
        <Spinner size='lg' color='secondary' />
        <span className='text-xs text-gray-500'>Processing...</span>
      </div>
    </div>
  ),
};
