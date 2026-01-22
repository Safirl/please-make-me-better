import type { ViewProps } from "react-native";
import { Text, View } from "react-native";
import { createStyle } from "./style";
import Button from "@/ui/Button";
import { Image } from 'expo-image';
import { Svg, Path } from "react-native-svg";
import { primaryTokens } from "@/assets/tokens/primary/primary.token";
import TextAnimatedLine from "@/ui/animations/animatedTexts/AnimatedText";

interface CustomFolderProps extends ViewProps {
    //     title: string
    //     folders: {
    //         label: string
    //         state?: "accent"
    //         id: "mission" | "image" | "autrui" | "rupture"
    //     }[]
    //     setSelectedView?: React.Dispatch<React.SetStateAction<"" | "identity" | "mission" | "image" | "autrui" | "rupture">>
}



const FolderHero: React.FC<CustomFolderProps> = (props) => {

    const {
        // folders,
        // title,
        // setSelectedView,
        ...rest
    } = props

    const noisyHuman = require("../../../assets/images/folders/id/id_noisy_human.png")

    const Style = createStyle();

    return <View
        {...rest}
        style={Style.main}
    >

        <View>
            <Image
                style={Style.image}
                source={noisyHuman}
                contentFit="cover"
            />
        </View>
        <View
            style={Style.textArea}
        >

            <TextAnimatedLine style={Style.title} text={"Perdue et en perte d'elle même"} > </TextAnimatedLine>




            <TextAnimatedLine style={Style.subTitle} text={"Qui est Mia ?"} delay={("Perdue et en perte d'elle même".length) * 5}> </TextAnimatedLine>

            <Svg
                width="286"
                height="60"
                viewBox="0 0 286 60"
                fill="none"
                style={Style.marker}
            >
                <Path
                    d="M37.6651 34H37.1651V34.5H37.6651V34ZM-0.00016276 57C-0.00016276 58.4728 1.19374 59.6667 2.6665 59.6667C4.13926 59.6667 5.33317 58.4728 5.33317 57C5.33317 55.5272 4.13926 54.3333 2.6665 54.3333C1.19374 54.3333 -0.00016276 55.5272 -0.00016276 57ZM37.6651 0H37.1651V34H37.6651H38.1651V0H37.6651ZM37.6651 34V34.5H285.665V34V33.5H37.6651V34ZM38.3085 33.6654L38.0346 33.2471L2.39263 56.5817L2.6665 57L2.94038 57.4183L38.5824 34.0837L38.3085 33.6654Z"
                    fill={primaryTokens["color-white"]}
                />
            </Svg>



            <Text style={[Style.paragraph]}>
                <TextAnimatedLine text={"Depuis longtemps,"}

                    delay={("Qui est Mia ?".length + "Perdue et en perte d'elle même".length) * 5}
                />{" "}
                <TextAnimatedLine
                    delay={("Depuis longtemps,".length + "Qui est Mia ?".length + "Perdue et en perte d'elle même".length) * 5}
                    text={"elle ressent un malaise."} style={[Style.accentParagraph]} />
            </Text>

            <TextAnimatedLine
                delay={("elle ressent un malaise.".length + "Depuis longtemps,".length + "Qui est Mia ?".length + "Perdue et en perte d'elle même".length) * 5}

                text={"Elle se sent en décalage avec les critères de beauté dominants."} style={[Style.paragraph, Style.accentParagraph]} />
            <TextAnimatedLine
                delay={("Elle se sent en décalage avec les critères de beauté dominants.".length + "elle ressent un malaise.".length + "Depuis longtemps,".length + "Qui est Mia ?".length + "Perdue et en perte d'elle même".length) * 5}


                text={"Comme si elle ne coïncidait jamais avec ce qu'on attend d'elle."} style={[Style.paragraph]} />

        </View>

    </View >



}



export default FolderHero