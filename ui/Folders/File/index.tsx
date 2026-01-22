import type { ViewProps } from "react-native";
import { Text, View, } from "react-native";
import { createStyle } from "./style";
import Button from "@/ui/Button";
import { Image } from 'expo-image';
import { Svg, Path } from "react-native-svg";
import TextAnimatedLine from "@/ui/animations/animatedTexts/AnimatedText";

import SvgComponent from "@/ui/svg";

interface CustomFolderProps extends ViewProps {
    title: string
    sectionName: string
    parahraph: {
        text: string
        style: "accent" | "neutral" | "accent2"
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

            <TextAnimatedLine style={Style.title} text={title} />

            <View
                style={Style.hr}
            ></View>


            {
                parahraph.map((lines, i) => {
                    return <Text style={[Style.paragraph]}>
                        {
                            lines.map((line, j) => {
                                return <TextAnimatedLine
                                    key={line.text}
                                    style={[
                                        line.style === "accent" && Style.accentParagraph,
                                        line.style === "accent2" && Style.accentParagraph2
                                    ]}
                                    text={line.text}
                                    delay={(() => {
                                        let acc = 0

                                        parahraph.map((p, l) => {
                                            if (l < i) {
                                                acc += p.reduce((sum, a) => {
                                                    return sum += a.text.length
                                                }, 0)
                                            }
                                        })
                                        const charCount = lines.map((a, k) => {
                                            if (k < j) {
                                                acc += a.text.length
                                            }
                                        })


                                        return acc * 5 + 120

                                    })()}

                                >

                                </TextAnimatedLine>

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