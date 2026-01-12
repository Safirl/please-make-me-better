import type { ViewProps } from "react-native";
import { Text, View } from "react-native";
import { createStyle } from "./style";
import Button from "@/ui/Button";

interface CustomFolderProps extends ViewProps {
    title: string
    folders: {
        label: string
        state?: "accent"
        id: "mission" | "image" | "autrui" | "rupture"
    }[]
    setSelectedView?: React.Dispatch<React.SetStateAction<"" | "identity" | "mission" | "image" | "autrui" | "rupture">>
}




const FolderHero: React.FC<CustomFolderProps> = (props) => {

    const {
        folders,
        title,
        setSelectedView,
        ...rest
    } = props

    const Style = createStyle();

    return <View
        {...rest}
        style={Style.main}
    >
        <Text style={Style.name}>{title}</Text>
        <View style={Style.row}>
            {
                folders.map((folder, i) => {
                    return <View
                        style={Style.item}
                    >
                        <Button
                            onPress={() => {
                                setSelectedView && setSelectedView(folder.id)
                            }}
                            type="verticalIcon"
                            state={folder.state}
                            label={folder.label}
                            icon={{ name: "folder" }}
                        />
                    </View>
                })
            }
        </View>
    </View>
}



export default FolderHero