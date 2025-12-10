import type { ViewProps } from "react-native";
import { Text, View } from "react-native";
import { createStyle } from "./style";

interface CustomFolderProps extends ViewProps {
    content: Content
}

type Content = {
    name: string
    labels: {
        label: string
        status: "locked" | "neutral"
    }[]
}[]



const FolderHero: React.FC<CustomFolderProps> = (props) => {

    const {
        content,

        ...rest
    } = props

    const Style = createStyle();

    return <View
        style={Style.main}
        {...rest}
    >

        {
            content.map(c => {
                return <View style={Style.row}>

                    <View style={Style.row}>

                        <Text style={Style.name} > {c.name} </Text>


                        {
                            c.labels.map(label => {
                                return <Text style={[Style.label, Style[`${label.status}`]]} > {label.label} </Text>
                            })
                        }

                    </View>

                </View>
            })
        }

    </View>
}



export default FolderHero