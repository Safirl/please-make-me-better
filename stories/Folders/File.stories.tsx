import File from '@/ui/Folders/File/index';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from "react-native";
import { fn } from 'storybook/test';
// import pp from "./assets/images/clients/niel_musk_pp.jpg";

// console.log(pp)

const meta = {
    title: 'UI/Folder/File',
    component: File,
    decorators: [
        (Story) => (
            <View style={{ flex: 1 }}>
                <Story />
            </View>
        ),
    ],
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // Use `fn` to spy on the onPress arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
    args: {
        next: fn()
    },
    // argTypes: {
    //     selectColor: {
    //         options: ["primary", "secondary", "tertiary", undefined],
    //         control: { type: "radio" },
    //     },
    // },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/5VGPGRjnfdWU60rwAdXXPe/Maquette-App-Configurateur?node-id=526-1641&t=WELEg4XJp0E2GD5j-1'
        }
    }
} satisfies Meta<typeof File>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        title: "Le conflit avec le miroir",
        sectionName: "Image de soi",
        parahraph: [
            [
                {
                    text: "Mia développe une dysmorphie.",
                    style: 'accent'
                },

            ],
            [

                {
                    text: "Elle a envisagé la transformation physique comme solution.",
                    style: "neutral"
                },

                {
                    text: "La chirurgie devient une tentative pour se conformer.",
                    style: "accent"
                },
            ],
            [
                {
                    text: "Mais malgré les changements, rien ne s'apaise.",
                    style: "neutral"
                },
            ],
            [
                {
                    text: "Le sentiment d'échec persiste.",
                    style: "neutral"
                },
            ]
        ]

    },

};

