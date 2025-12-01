import { useStorage } from '@/storage/store';
import { useEffect, useRef } from 'react';
import { Animated, Dimensions, Pressable, StyleSheet, Text } from 'react-native';

const { width, height } = Dimensions.get('window');

export type parameterType = "PARAMETER_CURSOR" | "PARAMETER_WHEEL" | "PARAMETER_WORD"

interface modalProps {
    children: React.ReactNode
}

export default function Modal(props: modalProps) {
    const {children} = props
    const slideAnim = useRef(new Animated.Value(width)).current;
    const isModalOpened = useStorage((state: any ) => state.isModalOpened)
    const resetCurrentParameter = useStorage((state: any) => state.resetCurrentParameter)

    useEffect(() => {
        isModalOpened ? openModal() : closeModal()
    }, [isModalOpened])
    
    const openModal = () => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };
    
    const closeModal = () => {
        Animated.timing(slideAnim, {
            toValue: width,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };
    
    return (
        <Animated.View
            style={[styles.container, {
                transform: [{ translateX: slideAnim }],
            }]}
        >
            {children}
            <Pressable
                onPress={resetCurrentParameter}
                style={{
                    marginTop: 20,
                    backgroundColor: '#007AFF',
                    padding: 10,
                    borderRadius: 10,
                }}
            >
                <Text style={{ color: 'white', textAlign: 'center' }}>Fermer</Text>
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        right: 0,
        width: width * 0.7,
        height: height,
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderBottomLeftRadius: 24,
        padding: 20,
        zIndex: 10,
    }
});