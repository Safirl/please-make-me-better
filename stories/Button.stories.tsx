import Button from '@/ui/Button/index';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Text, View } from "react-native";
import { fn } from 'storybook/test';

const ButtonStory = (args: { label: string }) => {
  const { label } = args
  return <Button>
    <Text>{label}</Text>
  </Button>
}

const meta = {
  title: 'Example/Button',
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
    label: "test",
    type: "default",
    subtype: "default"
  },
};

export const Secondary: Story = {
  args: {
    label: "test",
    type: "default",
    subtype: "default"
  },
};
