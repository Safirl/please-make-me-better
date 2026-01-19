import Experience from '@/assets/scripts/openGL/Experience';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import React, { useEffect, useRef } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import { useFrameCallback } from 'react-native-reanimated';


export default function App() {

  const containerRef = useRef<View>(null);

  const [experience, setExperience] = React.useState<Experience | null>(null)

  const [containerWidth, setContainerWidth] = React.useState(0)
  const [containerHeight, setContainerHeight] = React.useState(0)
  const [isGLReady, setIsGLReady] = React.useState(false)


  // useFrameCallback((frameInfo) => {
  //   if (!experience) return;

  //      experience.time.tick()
  // });

  const createExperience = (gl: ExpoWebGLRenderingContext) => {
    setExperience(new Experience(gl))
  }

  useEffect(() => {

  }, [containerRef])

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;

    setContainerWidth(width)
    setContainerHeight(height)
    setIsGLReady(true)

    experience && experience.resize()
  }

  return (
    <View
      onLayout={onLayout}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isGLReady && <GLView style={{ width: containerWidth, height: containerHeight }} onContextCreate={createExperience} />}
    </View>
  );
}

