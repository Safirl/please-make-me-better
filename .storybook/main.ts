import type { StorybookConfig } from '@storybook/react-native-web-vite';

const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": ['@storybook/addon-designs'],
  "framework": "@storybook/react-native-web-vite"
};
export default config;