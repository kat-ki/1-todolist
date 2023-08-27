import type { Meta, StoryObj } from '@storybook/react';
import {action} from '@storybook/addon-actions'
import { AddItemForm } from '../AddItemForm';
import React from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddItemForm> = {
  title: 'TODOLISTS/AddItemForm',
  component: AddItemForm,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    addItem: {
      description: 'Clicked button inside form',
      action: 'Clicked button inside form'
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const AddItemFormStory: Story = {};

export const AddItemFormWithErrorStory: Story = {
  render: () => <AddItemForm addItem={action('Clicked button inside form')}/>
};
