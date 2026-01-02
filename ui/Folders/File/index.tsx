import type { ViewProps } from "react-native";
import { Text, View, } from "react-native";
import { createStyle } from "./style";
import Button from "@/ui/Button";
import { Image } from 'expo-image';
import { Svg, Path } from "react-native-svg";
import { primaryTokens } from "@/tokens/primary/primary.token";
import SvgComponent from "@/ui/svg";

interface CustomFolderProps extends ViewProps {
    title: string
    sectionName: string
    parahraph: {
        text: string
        style: "accent" | "neutral"
    }[][]
    next?: () => void
    //     folders: {
    //         label: string
    //         state?: "accent"
    //         id: "mission" | "image" | "autrui" | "rupture"
    //     }[]
    //     setSelectedView?: React.Dispatch<React.SetStateAction<"" | "identity" | "mission" | "image" | "autrui" | "rupture">>
}





const FolderHero: React.FC<CustomFolderProps> = (props) => {

    const {
        title,
        sectionName,
        parahraph,
        next,
        ...rest
    } = props

    const Style = createStyle();

    return <View
        {...rest}
        style={Style.main}
    >

        <View
            style={Style.leftSection}
        >
            <SvgComponent
                name="folder"
            />


            <Text style={[Style.sectionName]}>
                {sectionName}
            </Text>
        </View>
        <View
            style={Style.textArea}
        >

            <Text style={Style.title}>{title}</Text>

            <View
                style={Style.hr}
            ></View>


            {
                parahraph.map(lines => {
                    return <Text style={[Style.paragraph]}>
                        {
                            lines.map(line => {
                                return <Text
                                    style={[
                                        line.style === "accent" && Style.accentParagraph
                                    ]}
                                >
                                    {line.text}
                                </Text>

                            })
                        }
                    </Text>
                })
            }


            {
                next &&
                <View
                    style={Style.btnContainer}
                >
                    <Button
                        type="back"
                        label="Dossier suivant >"
                        onPress={next}
                    />
                </View>
            }
        </View>

    </View >



}



export default FolderHero