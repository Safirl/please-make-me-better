import ClientRequestCard from '@/ui/ClientRequestCard/index';
import PersonnalityCard from '@/ui/Parameters/personnality/PersonnalityCard';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from "react-native";
import { fn } from 'storybook/test';


const meta = {
    title: 'UI/PersonnalityCard',
    component: PersonnalityCard,
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
    // args: {onPress: fn()},
    // argTypes: {
    //     selectColor: {
    //         options: ["primary", "secondary", "tertiary", undefined],
    //         control: {type: "radio"},
    //     },
    // },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/5VGPGRjnfdWU60rwAdXXPe/Maquette-App-Configurateur?node-id=1958-624&m=dev'
        }
    }
} satisfies Meta<typeof PersonnalityCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary
    :
    Story = {
    args: {
        trait0: {id: 1, icon: "comet", label: "test"},
        trait1: {id: 2, icon: "comet", label: "test2"},
    },

};

