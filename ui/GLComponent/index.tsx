import Experience from '@/gl/Experience';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import * as React from 'react';
export default function GLComponent() {

    const [experience, setExperience] = React.useState<Experience | null>(null)

    const createExperience = (gl: ExpoWebGLRenderingContext) => {
        setExperience(new Experience(gl))
    }





    return (
        <GLView
            style={{ flex: 1 }}
            onContextCreate={createExperience}
        />
    );
}