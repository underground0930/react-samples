import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Input } from '@/components/ui/input/input';

import { ErrorText } from './error-text';

const meta = {
  title: 'UI/ErrorText',
  component: ErrorText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='w-[400px]'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ErrorText>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    children: 'Error message',
  },
};

// Size variations
export const Small: Story = {
  args: {
    children: 'Small size error message',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium size error message (default)',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Large size error message',
    size: 'lg',
  },
};

// Common error messages
export const Required: Story = {
  args: {
    children: 'This field is required',
  },
};

export const InvalidEmail: Story = {
  args: {
    children: 'Please enter a valid email address',
  },
};

export const InvalidPassword: Story = {
  args: {
    children: 'Password must be at least 8 characters',
  },
};

export const MaxLength: Story = {
  args: {
    children: 'Must be 100 characters or less',
  },
};

export const MinLength: Story = {
  args: {
    children: 'Must be at least 10 characters',
  },
};

// With Input (error state)
export const WithInput: Story = {
  render: (args) => (
    <div>
      <Input placeholder='Enter email' error />
      <ErrorText {...args} />
    </div>
  ),
  args: {
    children: 'Please enter a valid email address',
  },
};

// Multiple error messages
export const MultipleErrors: Story = {
  render: () => (
    <div className='space-y-4'>
      <div>
        <Input placeholder='Enter name' error />
        <ErrorText>Name is required</ErrorText>
      </div>
      <div>
        <Input placeholder='Enter email' error />
        <ErrorText>Please enter a valid email address</ErrorText>
      </div>
      <div>
        <Input type='password' placeholder='Enter password' error />
        <ErrorText>Password must be at least 8 characters</ErrorText>
      </div>
    </div>
  ),
};

// Long error message
export const LongMessage: Story = {
  args: {
    children:
      'Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character. Previously used passwords cannot be reused.',
  },
};

// Size comparison with Input
export const SizeComparisonWithInput: Story = {
  render: () => (
    <div className='space-y-4'>
      <div>
        <Input size='sm' placeholder='Small input' error />
        <ErrorText size='sm'>Small size error message</ErrorText>
      </div>
      <div>
        <Input size='md' placeholder='Medium input' error />
        <ErrorText size='md'>Medium size error message</ErrorText>
      </div>
      <div>
        <Input size='lg' placeholder='Large input' error />
        <ErrorText size='lg'>Large size error message</ErrorText>
      </div>
    </div>
  ),
};
