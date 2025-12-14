import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from '@storybook/test';
import { useForm } from 'react-hook-form';

import { ErrorText } from '@/components/ui/error-text/error-text';

import { Input, InputWithRHF } from './input';

const meta = {
  title: 'UI/Input',
  component: Input,
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
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    placeholder: 'Enter text',
  },
};

// Size variations
export const Small: Story = {
  args: {
    placeholder: 'Enter text',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    placeholder: 'Enter text',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Enter text',
    size: 'lg',
  },
};

// With value
export const WithValue: Story = {
  args: {
    defaultValue: 'John Doe',
    placeholder: 'Enter name',
  },
};

// Error state
export const Error: Story = {
  args: {
    placeholder: 'Enter email',
    error: true,
  },
};

// Error state with value
export const ErrorWithValue: Story = {
  args: {
    defaultValue: 'invalid-email',
    placeholder: 'Enter email',
    error: true,
  },
};

// With error message
export const WithErrorMessage: Story = {
  render: (args) => (
    <div>
      <Input {...args} />
      <ErrorText>Please enter a valid email address</ErrorText>
    </div>
  ),
  args: {
    defaultValue: 'invalid-email',
    placeholder: 'Enter email',
    error: true,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    placeholder: 'Enter text',
    disabled: true,
  },
};

export const DisabledWithValue: Story = {
  args: {
    defaultValue: 'Cannot edit',
    disabled: true,
  },
};

// Different input types
export const TypeEmail: Story = {
  args: {
    type: 'email',
    placeholder: 'email@example.com',
  },
};

export const TypePassword: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
};

export const TypeNumber: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter number',
  },
};

export const TypeTel: Story = {
  args: {
    type: 'tel',
    placeholder: '090-1234-5678',
  },
};

// Form example (error state)
export const FormExample: Story = {
  render: () => (
    <div className='w-[400px]'>
      <div className='mb-4'>
        <Input placeholder='Enter name' />
      </div>
      <div className='mb-4'>
        <Input type='email' placeholder='Enter email' error />
        <ErrorText>Please enter a valid email address</ErrorText>
      </div>
      <div>
        <Input type='password' placeholder='Enter password' />
      </div>
    </div>
  ),
};

// Size comparison
export const SizeComparison: Story = {
  render: () => (
    <div className='w-[400px]'>
      <div className='mb-3'>
        <Input size='sm' placeholder='Small' />
      </div>
      <div className='mb-3'>
        <Input size='md' placeholder='Medium (default)' />
      </div>
      <div>
        <Input size='lg' placeholder='Large' />
      </div>
    </div>
  ),
};

// React Hook Form integration (direct register spread)
export const WithReactHookFormDirect: Story = {
  render: () => {
    type FormData = {
      email: string;
      password: string;
    };

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>();

    const onSubmit = fn((data: FormData) => {
      console.log(`Submitted: ${JSON.stringify(data, null, 2)}`);
    });

    return (
      <form onSubmit={handleSubmit(onSubmit)} className='w-[400px]'>
        <div className='mb-4'>
          <Input {...register('email')} placeholder='Enter email' error={!!errors.email} />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        </div>
        <div className='mb-4'>
          <Input
            {...register('password')}
            type='password'
            placeholder='Enter password'
            error={!!errors.password}
          />
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        </div>
        <button type='submit' className='rounded bg-blue-600 px-4 py-2 text-white'>
          Submit
        </button>
      </form>
    );
  },
};

// React Hook Form integration (InputWithRHF - auto type inference)
export const WithReactHookFormWrapper: Story = {
  render: () => {
    type FormData = {
      email: string;
      password: string;
    };

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>();

    const onSubmit = fn((data: FormData) => {
      console.log(`Submitted: ${JSON.stringify(data, null, 2)}`);
    });

    return (
      <form onSubmit={handleSubmit(onSubmit)} className='w-[400px]'>
        <div className='mb-4'>
          {/* No generics needed! Auto-inferred from register */}
          <InputWithRHF
            name='email'
            register={register}
            placeholder='Enter email'
            error={!!errors.email}
          />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        </div>
        <div className='mb-4'>
          <InputWithRHF
            name='password'
            register={register}
            type='password'
            placeholder='Enter password'
            error={!!errors.password}
          />
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        </div>
        <button type='submit' className='rounded bg-blue-600 px-4 py-2 text-white'>
          Submit
        </button>
      </form>
    );
  },
};
