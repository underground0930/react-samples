import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useForm } from 'react-hook-form';

import { ErrorText } from '@/components/ui/error-text/error-text';

import { Select, SelectWithRHF, type SelectOption } from './select';

const sampleOptions: SelectOption[] = [
  { label: 'Frontend Engineer', value: 'frontend' },
  { label: 'Backend Engineer', value: 'backend' },
  { label: 'Designer', value: 'designer' },
  { label: 'Product Manager', value: 'pm' },
  { label: 'Data Scientist', value: 'data-scientist' },
];

const meta = {
  title: 'UI/Select',
  component: Select,
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
  args: {
    options: sampleOptions,
    placeholder: 'Select an option',
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {},
};

// Size variations
export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

// With selected value
export const WithValue: Story = {
  args: {
    value: 'frontend',
  },
};

// Error state
export const Error: Story = {
  args: {
    error: true,
  },
};

// Error state with value
export const ErrorWithValue: Story = {
  args: {
    value: 'backend',
    error: true,
  },
};

// With error message
export const WithErrorMessage: Story = {
  render: (args) => (
    <div>
      <Select {...args} />
      <ErrorText>Please select a position</ErrorText>
    </div>
  ),
  args: {
    error: true,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledWithValue: Story = {
  args: {
    value: 'designer',
    disabled: true,
  },
};

// Without placeholder
export const WithoutPlaceholder: Story = {
  args: {
    placeholder: undefined,
  },
};

// Size comparison
export const SizeComparison: Story = {
  render: () => (
    <div className='w-[400px]'>
      <div className='mb-3'>
        <Select options={sampleOptions} size='sm' placeholder='Small' />
      </div>
      <div className='mb-3'>
        <Select options={sampleOptions} size='md' placeholder='Medium (default)' />
      </div>
      <div>
        <Select options={sampleOptions} size='lg' placeholder='Large' />
      </div>
    </div>
  ),
};

// Form example
export const FormExample: Story = {
  render: () => (
    <div className='w-[400px]'>
      <div className='mb-4'>
        <Select options={sampleOptions} placeholder='Select position' />
      </div>
      <div className='mb-4'>
        <Select options={sampleOptions} placeholder='Select position' error />
        <ErrorText>Please select a position</ErrorText>
      </div>
      <div>
        <Select options={sampleOptions} value='frontend' disabled />
      </div>
    </div>
  ),
};

// React Hook Form integration (using Controller directly)
export const WithReactHookFormDirect: Story = {
  render: () => {
    type FormData = {
      position: string;
      department: string;
    };

    const { control, handleSubmit } = useForm<FormData>({
      defaultValues: {
        position: '',
        department: '',
      },
    });

    const onSubmit = (data: FormData) => {
      alert(`Submitted: ${JSON.stringify(data, null, 2)}`);
    };

    const departmentOptions: SelectOption[] = [
      { label: 'Engineering', value: 'engineering' },
      { label: 'Sales', value: 'sales' },
      { label: 'Marketing', value: 'marketing' },
    ];

    return (
      <form onSubmit={handleSubmit(onSubmit)} className='w-[400px]'>
        <div className='mb-4'>
          <SelectWithRHF
            name='position'
            control={control}
            options={sampleOptions}
            placeholder='Select position'
          />
        </div>
        <div className='mb-4'>
          <SelectWithRHF
            name='department'
            control={control}
            options={departmentOptions}
            placeholder='Select department'
          />
        </div>
        <button type='submit' className='rounded bg-blue-600 px-4 py-2 text-white'>
          Submit
        </button>
      </form>
    );
  },
};

// React Hook Form integration (using SelectWithRHF)
export const WithReactHookFormWrapper: Story = {
  render: () => {
    type FormData = {
      position: string;
    };

    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>({
      defaultValues: {
        position: '',
      },
    });

    const onSubmit = (data: FormData) => {
      alert(`Submitted: ${JSON.stringify(data, null, 2)}`);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className='w-[400px]'>
        <div className='mb-4'>
          <SelectWithRHF
            name='position'
            control={control}
            options={sampleOptions}
            placeholder='Select position'
            error={!!errors.position}
          />
          {errors.position && <ErrorText>{errors.position.message}</ErrorText>}
        </div>
        <button type='submit' className='rounded bg-blue-600 px-4 py-2 text-white'>
          Submit
        </button>
      </form>
    );
  },
};
