import FolderList from '@/ui/Folders/FolderList/index';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from "react-native";
// import pp from "./assets/images/clients/niel_musk_pp.jpg";

// console.log(pp)

const meta = {
    title: 'UI/Folder/List',
    component: FolderList,
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
} satisfies Meta<typeof FolderList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        folders: [
            {
                label: "Votre mission",
                state: "accent"
            },
            {
                label: "Image de soi",
            },
            {
                label: "Autrui",
            },
            {
                label: "Rupture",
            }
        ],
        title: "Consulter ses dossiers"
    },

};

