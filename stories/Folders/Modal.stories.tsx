import Modal from '@/ui/Folders/index';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from "react-native";
// import pp from "./assets/images/clients/niel_musk_pp.jpg";
import { fn } from 'storybook/test';
// console.log(pp)

const meta = {
    title: 'UI/Folder/Modal',
    component: Modal,
    decorators: [
        (Story) => (
            <View style={{ flex: 1, alignItems: 'flex-start', paddingTop: 200 }}>
                <Story />
            </View>
        ),
    ],
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // Use `fn` to spy on the onPress arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
    args: {
        configure: fn()
    },
    argTypes: {
        selectColor: {
            options: ["primary", "secondary", "tertiary", undefined],
            control: { type: "radio" },
        },
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/5VGPGRjnfdWU60rwAdXXPe/Maquette-App-Configurateur?node-id=526-1641&t=WELEg4XJp0E2GD5j-1'
        }
    }
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        selectColor: "secondary",
        tabs: ["Dossier", "Lore"],
        type: "",

        client: {
            name: "NIEL MUSK",
            request: "Je veux être perçu comme un leader",
            work: "Conseillé en banque",
            age: "28 ans",
            profilePicture: `./assets/images/clients/niel_musk_pp.jpg`
        },
        gridContent: [
            {
                name: "Emotions",
                labels: [{
                    label: "Lorem Ipsum",
                    status: "locked"
                },
                {
                    label: "Lorem Ipsum",
                    status: "neutral"
                },
                {
                    label: "Lorem Ipsum",
                    status: "neutral"
                }]
            },
            {
                name: "Emotions",
                labels: [{
                    label: "Lorem Ipsum",
                    status: "locked"
                },
                {
                    label: "Lorem Ipsum",
                    status: "neutral"
                },
                {
                    label: "Lorem Ipsum",
                    status: "neutral"
                }]
            },
            {
                name: "Emotions",
                labels: [{
                    label: "Lorem Ipsum",
                    status: "locked"
                },
                {
                    label: "Lorem Ipsum",
                    status: "neutral"
                },
                {
                    label: "Lorem Ipsum",
                    status: "neutral"
                }]
            },
        ]
    },

};

