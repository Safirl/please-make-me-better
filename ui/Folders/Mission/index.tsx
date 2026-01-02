import type { ViewProps } from "react-native";
import { Text, View, } from "react-native";
import { createStyle } from "./style";
import Button from "@/ui/Button";
import { Image } from 'expo-image';
import { Svg, Path } from "react-native-svg";
import { primaryTokens } from "@/tokens/primary/primary.token";
import SvgComponent from "@/ui/svg";

interface CustomFolderProps extends ViewProps {
    // title: string
    // sectionName: string
    // parahraph: {
    //     text: string
    //     style: "accent" | "neutral" | "accent2"
    // }[][]
    configure?: () => void
    //     folders: {
    //         label: string
    //         state?: "accent"
    //         id: "mission" | "image" | "autrui" | "rupture"
    //     }[]
    //     setSelectedView?: React.Dispatch<React.SetStateAction<"" | "identity" | "mission" | "image" | "autrui" | "rupture">>
}


const FolderHero: React.FC<CustomFolderProps> = (props) => {

    const {
        // title,
        // sectionName,
        // parahraph,
        configure,
        ...rest
    } = props

    const Style = createStyle();

    return <View
        style={{
            alignItems: "center"
        }}
    >
        <View
            {...rest}
            style={Style.main}
        >
            <View style={[Style.line]}>
                <View style={[Style.headingTextSection]}>
                    <Text style={[Style.title]}>Reconfigurer Mia</Text>
                    <Text style={[Style.paragraph, Style.secondaryText]}>Votre mission consiste à déplacer :</Text>
                </View>
                <View style={
                    {
                        height: 48
                    }
                }>
                    <Button
                        type="primary"
                        label="Configurer"
                        onPress={configure}
                    />
                </View>
            </View>


            <View style={[Style.line]}>



                <View style={[Style.verticalMissionContainer]}>
                    <View style={[Style.mission, Style.lineDirection]}>
                        <SvgComponent name='eye' />
                        <View style={[]}>
                            <Text style={[Style.paragraph]}>Le regard</Text>
                            <Text style={[Style.paragraph, Style.secondaryText]}>Miroir → introspection</Text>
                        </View>
                    </View>
                    <View style={[Style.mission, Style.lineDirection]}>
                        <SvgComponent name='heart' />
                        <View style={[]}>
                            <Text style={[Style.paragraph]}>Le besoin</Text>
                            <Text style={[Style.paragraph, Style.secondaryText]}>Validation → relations</Text>
                        </View>
                    </View>
                </View>
                <View style={[Style.mission, Style.columnDirection]}>
                    <SvgComponent name='star' />
                    <View style={[]}>
                        <Text style={[Style.paragraph]}>La valeur</Text>
                        <Text style={[Style.paragraph, Style.secondaryText]}>Apparence → identité</Text>
                    </View>
                </View>


            </View>
        </View >
    </View >



}



export default FolderHero