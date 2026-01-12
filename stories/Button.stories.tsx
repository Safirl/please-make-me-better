import { Button } from '@/ui/Button/index';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Text, View } from "react-native";
import { fn } from 'storybook/test';

const ButtonStory = (args: { label: string }) => {
  const { label } = args
  return <Button type='primary'>
    <Text>{label}</Text>
  </Button>
}

const meta = {
  title: 'Ui/Button',
  component: Button,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, alignItems: 'flex-start' }}>
        <Story />
      </View>
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // Use `fn` to spy on the onPress arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: { onPress: fn() },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: 'primary',
    label: "Primary button",
    icon: {name: "emotion"},
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
    label: "Secondary button",
    icon: {name: "memory"}
  },
};

export const Tertiary: Story = {
  args: {
    type: 'tertiary',
    label: "Tertiary button",
    icon: {name: "personality"}
  },
};

export const Back: Story = {
  args: {
    type: 'back',
    label: "< retour",
  },
};
