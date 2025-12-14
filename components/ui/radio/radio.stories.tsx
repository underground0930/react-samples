import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from '@storybook/test';
import React from 'react';
import { useForm } from 'react-hook-form';

import { Radio, RadioGroupWithRHF, RadioWithLabel } from './radio';

const meta: Meta<typeof Radio> = {
  title: 'UI/Radio',
  component: Radio,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    name: 'radio-default',
  },
};

export const Checked: Story = {
  args: {
    name: 'radio-checked',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    name: 'radio-disabled',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    name: 'radio-disabled-checked',
    defaultChecked: true,
    disabled: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className='flex flex-col gap-4 p-4'>
      <RadioWithLabel name='radio-label-group' value='unchecked' label='Unchecked' />
      <RadioWithLabel name='radio-label-group' value='checked' defaultChecked label='Checked' />
      <RadioWithLabel
        name='radio-label-disabled'
        value='disabled'
        disabled
        label='Disabled (unchecked)'
      />
      <RadioWithLabel
        name='radio-label-disabled-checked'
        value='disabled-checked'
        defaultChecked
        disabled
        label='Disabled (checked)'
      />
    </div>
  ),
};

export const RadioGroup: Story = {
  render: () => {
    const [value, setValue] = React.useState('option1');
    return (
      <div className='flex flex-col gap-4 p-4'>
        <RadioWithLabel
          name='radio-group-example'
          value='option1'
          checked={value === 'option1'}
          onChange={(e) => setValue(e.target.value)}
          label='Option 1'
        />
        <RadioWithLabel
          name='radio-group-example'
          value='option2'
          checked={value === 'option2'}
          onChange={(e) => setValue(e.target.value)}
          label='Option 2'
        />
        <RadioWithLabel
          name='radio-group-example'
          value='option3'
          checked={value === 'option3'}
          onChange={(e) => setValue(e.target.value)}
          label='Option 3'
        />
        <p className='text-sm text-gray-500'>Selected: {value}</p>
      </div>
    );
  },
};

// Horizontal RadioGroup
export const HorizontalRadioGroup: Story = {
  render: () => {
    const [value, setValue] = React.useState('project');
    return (
      <div className='flex items-center gap-4 p-4'>
        <span className='w-20 text-sm font-bold text-gray-900'>Share to</span>
        <div className='flex items-center gap-4'>
          <RadioWithLabel
            name='share-target'
            value='project'
            checked={value === 'project'}
            onChange={(e) => setValue(e.target.value)}
            label='Project'
          />
          <RadioWithLabel
            name='share-target'
            value='private'
            checked={value === 'private'}
            onChange={(e) => setValue(e.target.value)}
            label='Private'
          />
        </div>
      </div>
    );
  },
};

// react-hook-form with register
type FormData = {
  shareTarget: string;
};

export const WithReactHookFormRegister: Story = {
  render: () => {
    const { register, watch, handleSubmit } = useForm<FormData>({
      defaultValues: {
        shareTarget: 'project',
      },
    });

    const onSubmit = fn((data: FormData) => {
      console.log(`Submitted: ${JSON.stringify(data)}`);
    });

    const currentValue = watch('shareTarget');

    return (
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 p-4'>
        <div className='flex items-center gap-4'>
          <span className='w-20 text-sm font-bold text-gray-900'>Share to</span>
          <div className='flex items-center gap-4'>
            <RadioWithLabel {...register('shareTarget')} value='project' label='Project' />
            <RadioWithLabel {...register('shareTarget')} value='private' label='Private' />
          </div>
        </div>
        <p className='text-sm text-gray-500'>Selected: {currentValue}</p>
        <button
          type='submit'
          className='w-fit rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white'
        >
          Submit
        </button>
      </form>
    );
  },
};

// react-hook-form with RadioGroupWithRHF - recommended
export const WithRadioGroupRHF: Story = {
  render: () => {
    const { control, watch, handleSubmit } = useForm<FormData>({
      defaultValues: {
        shareTarget: 'project',
      },
    });

    const onSubmit = fn((data: FormData) => {
      console.log(`Submitted: ${JSON.stringify(data)}`);
    });

    const currentValue = watch('shareTarget');

    return (
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 p-4'>
        <div className='flex items-center gap-4'>
          <span className='w-20 text-sm font-bold text-gray-900'>Share to</span>
          <RadioGroupWithRHF
            name='shareTarget'
            control={control}
            options={[
              { label: 'Project', value: 'project' },
              { label: 'Private', value: 'private' },
            ]}
          />
        </div>
        <p className='text-sm text-gray-500'>Selected: {currentValue}</p>
        <button
          type='submit'
          className='w-fit rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white'
        >
          Submit
        </button>
      </form>
    );
  },
};
