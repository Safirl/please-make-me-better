import type { ViewProps } from "react-native";
import { Text, View, } from "react-native";
import { createStyle } from "./style";
import Button from "@/ui/Button";
import { Image } from 'expo-image';
import { Svg, Path } from "react-native-svg";
import { primaryTokens } from "@/assets/tokens/primary/primary.token";
import SvgComponent from "@/ui/svg";
import TextAnimatedLine from "@/ui/animations/animatedTexts/AnimatedText";

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
            alignItems: "center",
            minWidth: 443 + 180,
            paddingVertical: 4
        }}
    >
        <View
            {...rest}
            style={Style.main}
        >
            <View style={[Style.line, {
                height: 48,
                maxHeight: 48
            }]}>
                <View style={[Style.headingTextSection]}>
                    <TextAnimatedLine style={[Style.title]} text={"Reconfigurer Mia"}></TextAnimatedLine>
                    <TextAnimatedLine style={[Style.paragraph, Style.secondaryText]} text={"Votre mission consiste à déplacer :"} delay={"Reconfigurer Mia".length * 5}></TextAnimatedLine>
                </View>
                <View style={
                    {
                        height: 48
                    }
                }>
                    {
                        configure &&
                        <Button
                            type="primary"
                            label="Configurer"
                            onPress={configure}
                        />
                    }
                </View>
            </View>


            <View style={[Style.line]}>



                <View style={[Style.verticalMissionContainer]}>
                    <View style={[Style.mission, Style.lineDirection]}>
                        <SvgComponent name='eye' />
                        <View style={[]}>
                            <TextAnimatedLine style={[Style.paragraph]} text={"Le regard"} delay={("Votre mission consiste à déplacer :".length + "Reconfigurer Mia".length) * 5}></TextAnimatedLine>
                            <TextAnimatedLine style={[Style.paragraph, Style.secondaryText]} delay={("Le regard".length + "Votre mission consiste à déplacer :".length + "Reconfigurer Mia".length) * 5} text="Miroir → introspection"></TextAnimatedLine>
                        </View>
                    </View>
                    <View style={[Style.mission, Style.lineDirection]}>
                        <SvgComponent name='heart' />
                        <View style={[]}>
                            <TextAnimatedLine style={[Style.paragraph]} delay={("Miroir → introspection".length + "Le regard".length + "Votre mission consiste à déplacer :".length + "Reconfigurer Mia".length) * 5} text={"Le besoin"}></TextAnimatedLine>
                            <TextAnimatedLine style={[Style.paragraph, Style.secondaryText]} delay={("Miroir → introspection".length + "Le regard".length + "Votre mission consiste à déplacer :".length + "Reconfigurer Mia".length + "Validation → relations".length) * 5} text={"Validation → relations"}></TextAnimatedLine>
                        </View>
                    </View>
                </View>
                <View style={[Style.mission, Style.columnDirection]}>
                    <SvgComponent name='star' />
                    <View style={[]}>
                        <TextAnimatedLine
                            delay={("Validation → relations".length + "Miroir → introspection".length + "Le regard".length + "Votre mission consiste à déplacer :".length + "Reconfigurer Mia".length + "Validation → relations".length) * 5}
                            style={[Style.paragraph]} text={"La valeur"}></TextAnimatedLine>
                        <TextAnimatedLine
                            delay={("La valeur".length + "Validation → relations".length + "Miroir → introspection".length + "Le regard".length + "Votre mission consiste à déplacer :".length + "Reconfigurer Mia".length + "Validation → relations".length) * 5}

                            style={[Style.paragraph, Style.secondaryText]} text={"Apparence → identité"}></TextAnimatedLine>
                    </View>
                </View>


            </View>
        </View >
    </View >



}



export default FolderHero