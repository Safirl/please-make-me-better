import ClientRequestCard from '@/ui/ClientRequestCard/index';
import type {Meta, StoryObj} from '@storybook/react-native-web-vite';
import {Text, View} from "react-native";
import {fn} from 'storybook/test';


const meta = {
    title: 'UI/ClientRequestCard',
    component: ClientRequestCard,
    decorators: [
        (Story) => (
            <View style={{flex: 1, alignItems: 'flex-start'}}>
                <Story/>
            </View>
        ),
    ],
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // Use `fn` to spy on the onPress arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
    args: {onPress: fn()},
    argTypes: {
        selectColor: {
            options: ["primary", "secondary", "tertiary", undefined],
            control: {type: "radio"},
        },
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/5VGPGRjnfdWU60rwAdXXPe/Maquette-App-Configurateur?node-id=526-1662&m=dev'
        }
    }
} satisfies Meta<typeof ClientRequestCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary
    :
    Story = {
    args: {
        selectColor: "secondary",
        title: "NIEL MUSK",
        paragraph: "Je veux être perçu comme un leader",
        count: "D#"
    },

};

