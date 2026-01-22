import Button from "@/ui/Button";
import { Image } from 'expo-image';
import type { GestureResponderEvent, ViewProps } from "react-native";
import { Text, View } from "react-native";
import { createStyle } from "./style";
import TextAnimatedLine from "@/ui/animations/animatedTexts/AnimatedText";

interface CustomFolderProps extends ViewProps {
    client: {
        name: string
        request: string
        work: string
        age: string
        profilePicture: string
    }
    configure: (event: GestureResponderEvent) => void
}


const FolderHero: React.FC<CustomFolderProps> = (props) => {

    const {
        client,
        configure,

        ...rest
    } = props

    const Style = createStyle();

    return <View
        style={Style.main}
        {...rest}
    >

        <View
            style={Style.client}
        >

            <Image
                style={Style.image}
                source={client.profilePicture}
                contentFit="cover"
            />

            <View>
                <TextAnimatedLine style={Style.titleFont} text={client.name} charSpeed={35}/>
                <TextAnimatedLine style={Style.paragraphFont} text={client.request} charSpeed={35} delay={120}/>
                <TextAnimatedLine style={Style.paragraphFont} text={client.work} charSpeed={35} delay={240}/>
                <TextAnimatedLine style={Style.paragraphFont} text={client.age} charSpeed={35} delay={360}/>
            </View>
        </View>
        <View>
            <Button
                icon={{ name: "human" }}
                type="secondary"
                label="Fiche Identité"
                onPress={configure}
            />
        </View>

    </View>
}



export default FolderHero