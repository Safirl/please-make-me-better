import type {
    PressableProps,
} from "react-native";
import {
    Pressable, Text
} from "react-native";

interface CustomButtonProps extends PressableProps {
    type?: string;
    label?: string;
    subtype?: 'default' | 'danger' | 'neutral'
    children?: React.ReactNode;
}

const buttonStyle = {

}


const Button: React.FC<CustomButtonProps> = (props) => {

    const {
        type,
        subtype,
        children,
        label,
        ...rest
    } = props


    return <Pressable
        {...rest}
    >
        {
            label
                ? <Text>{label}</Text>
                : children
        }
    </Pressable>
}
export default Button 
