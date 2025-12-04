import type {
    PressableProps,
} from "react-native";
import {
    Pressable
} from "react-native";

interface CustomButtonProps extends PressableProps {
    type?: '';
    subtype?: 'default' | 'danger' | 'neutral'
    children?: React.ReactNode;
}

const buttonStyle = {
    
}


const CustomButton: React.FC<CustomButtonProps> = (props) => {

    const {
        type,
        subtype,
        children,
        ...rest
    } = props


    return <Pressable
        {...rest}
    >
        {children}
    </Pressable>
}
export default CustomButton 