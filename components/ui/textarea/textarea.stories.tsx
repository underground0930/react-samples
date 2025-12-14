import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useForm } from 'react-hook-form';

import { ErrorText } from '@/components/ui/error-text/error-text';

import { Textarea, TextareaWithRHF } from './textarea';

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
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
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    placeholder: 'Enter text',
    rows: 4,
  },
};

// Size variations
export const Small: Story = {
  args: {
    placeholder: 'Enter text',
    size: 'sm',
    rows: 3,
  },
};

export const Medium: Story = {
  args: {
    placeholder: 'Enter text',
    size: 'md',
    rows: 4,
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Enter text',
    size: 'lg',
    rows: 5,
  },
};

// With value
export const WithValue: Story = {
  args: {
    defaultValue: 'This is sample text.\nYou can enter multiple lines.\nTextarea component test.',
    placeholder: 'Enter comment',
    rows: 5,
  },
};

// Error state
export const Error: Story = {
  args: {
    placeholder: 'Enter comment',
    error: true,
    rows: 4,
  },
};

// Error state with value
export const ErrorWithValue: Story = {
  args: {
    defaultValue: 'Invalid content',
    placeholder: 'Enter comment',
    error: true,
    rows: 4,
  },
};

// With error message
export const WithErrorMessage: Story = {
  render: (args) => (
    <div>
      <Textarea {...args} />
      <ErrorText>Must be 100 characters or less</ErrorText>
    </div>
  ),
  args: {
    defaultValue: 'Very long text has been entered...',
    placeholder: 'Enter comment',
    error: true,
    rows: 4,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    placeholder: 'Enter text',
    disabled: true,
    rows: 4,
  },
};

export const DisabledWithValue: Story = {
  args: {
    defaultValue: 'Cannot edit',
    disabled: true,
    rows: 4,
  },
};

// Row variations
export const Rows3: Story = {
  args: {
    placeholder: '3 rows',
    rows: 3,
  },
};

export const Rows6: Story = {
  args: {
    placeholder: '6 rows',
    rows: 6,
  },
};

export const Rows10: Story = {
  args: {
    placeholder: '10 rows',
    rows: 10,
  },
};

// Form example (error state)
export const FormExample: Story = {
  render: () => (
    <div className='w-[400px]'>
      <div className='mb-4'>
        <Textarea placeholder='Enter name' rows={2} />
      </div>
      <div className='mb-4'>
        <Textarea placeholder='Enter comment' error rows={4} />
        <ErrorText>Comment is required</ErrorText>
      </div>
      <div>
        <Textarea placeholder='Enter notes' rows={3} />
      </div>
    </div>
  ),
};

// Size comparison
export const SizeComparison: Story = {
  render: () => (
    <div className='w-[400px]'>
      <div className='mb-3'>
        <Textarea size='sm' placeholder='Small' rows={3} />
      </div>
      <div className='mb-3'>
        <Textarea size='md' placeholder='Medium (default)' rows={4} />
      </div>
      <div>
        <Textarea size='lg' placeholder='Large' rows={5} />
      </div>
    </div>
  ),
};

// React Hook Form integration (direct register spread)
export const WithReactHookFormDirect: Story = {
  render: () => {
    type FormData = {
      description: string;
      comment: string;
    };

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
      alert(`Submitted: ${JSON.stringify(data, null, 2)}`);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className='w-[400px]'>
        <div className='mb-4'>
          <Textarea
            {...register('description')}
            placeholder='Enter description'
            rows={4}
            error={!!errors.description}
          />
          {errors.description && <ErrorText>{errors.description.message}</ErrorText>}
        </div>
        <div className='mb-4'>
          <Textarea
            {...register('comment')}
            placeholder='Enter comment'
            rows={3}
            error={!!errors.comment}
          />
          {errors.comment && <ErrorText>{errors.comment.message}</ErrorText>}
        </div>
        <button type='submit' className='rounded bg-blue-600 px-4 py-2 text-white'>
          Submit
        </button>
      </form>
    );
  },
};

// React Hook Form integration (TextareaWithRHF - auto type inference)
export const WithReactHookFormWrapper: Story = {
  render: () => {
    type FormData = {
      description: string;
      comment: string;
    };

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
      alert(`Submitted: ${JSON.stringify(data, null, 2)}`);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className='w-[400px]'>
        <div className='mb-4'>
          {/* No generics needed! Auto-inferred from register */}
          <TextareaWithRHF
            name='description'
            register={register}
            placeholder='Enter description'
            rows={4}
            error={!!errors.description}
          />
          {errors.description && <ErrorText>{errors.description.message}</ErrorText>}
        </div>
        <div className='mb-4'>
          <TextareaWithRHF
            name='comment'
            register={register}
            placeholder='Enter comment'
            rows={3}
            error={!!errors.comment}
          />
          {errors.comment && <ErrorText>{errors.comment.message}</ErrorText>}
        </div>
        <button type='submit' className='rounded bg-blue-600 px-4 py-2 text-white'>
          Submit
        </button>
      </form>
    );
  },
};
