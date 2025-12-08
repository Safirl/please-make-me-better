import type {
    ViewProps,
} from "react-native";
import {
    Pressable, View, Text,
} from "react-native";
import React from "react";
import {createStyle} from "./style";
import ClientRequestTab from "@/ui/ClientRequestTab";
import ClientRequestCard from "@/ui/ClientRequestCard";

interface ClientRequestList extends ViewProps {
    elements?: {
        selectColor?: "primary" | "secondary" | "tertiary";
        title: string;
        paragraph: string;
        count: string,
        id: string
    }[]
    title: string;
    selectRequest: (id: string) => void;
}


const ClientRequestList: React.FC<ClientRequestList> = (props) => {

    const {
        elements,
        children,
        selectRequest,
        title,
        ...rest
    } = props


    const Style = createStyle();

    return <View style={Style.main} {...rest} >

        <Text style={Style.title}>{title}</Text>

        <View style={Style.list} {...rest} >
            {children && <>{children}</>}

            {
                elements && <>
                    {
                        elements.map(element => {
                            return (<React.Fragment key={element.id}>
                                    <ClientRequestCard
                                        selectColor={element.selectColor}
                                        title={element.title}
                                        paragraph={element.paragraph}
                                        count={element.count}
                                        onPress={() => selectRequest(element.id)}
                                    />
                                </React.Fragment>
                            )
                        })
                    }
                </>
            }


        </View>
    </View>


}
export default ClientRequestList