import ClientRequestList from '@/ui/ClientRequestList/index';
import type {Meta, StoryObj} from '@storybook/react-native-web-vite';
import {Text, View} from "react-native";
import {fn} from 'storybook/test';


const meta = {
    title: 'UI/ClientRequestList',
    component: ClientRequestList,
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
    args: {
        selectRequest: fn()
    },
    argTypes: {},
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/5VGPGRjnfdWU60rwAdXXPe/Maquette-App-Configurateur?node-id=526-1641&t=WELEg4XJp0E2GD5j-1'
        }
    }
} satisfies Meta<typeof ClientRequestList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary
    :
    Story = {
    args: {
        elements: [{
            selectColor: "secondary",
            title: "NIEL MUSK",
            paragraph: "Je veux être perçu comme un leader",
            count: "D#",
            id: `${Math.random()}`
        },
            {
                // selectColor: "secondary",
                title: "NIEL MUSK",
                paragraph: "Je veux être perçu comme un leader",
                count: "D#",
                id: `${Math.random()}`
            },
            {
                // selectColor: "secondary",
                title: "NIEL MUSK",
                paragraph: "Je veux être perçu comme un leader",
                count: "D#",
                id: `${Math.random()}`
            }],
        title: 'Demandes clients du jour '


    },

};

