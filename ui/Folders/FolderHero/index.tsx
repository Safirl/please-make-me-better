import Button from "@/ui/Button";
import { Image } from 'expo-image';
import type { GestureResponderEvent, ViewProps } from "react-native";
import { Text, View } from "react-native";
import { createStyle } from "./style";

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
                source={{ uri: client.profilePicture }}
                contentFit="cover"
            />

            <View>
                <Text style={Style.titleFont} > {client.name} // </Text>
                <Text style={Style.paragraphFont} > {client.request} </Text>
                <Text style={Style.paragraphFont} > {client.work} </Text>
                <Text style={Style.paragraphFont} > iosefisefjsiofje f.       {client.age} </Text>
            </View>
        </View>
        <View>
            <Button type="primary" label="Configurer" onPress={configure} />
        </View>

    </View>
}



export default FolderHero