
import Experience from "@/webGPU/Experience";
import React from "react";
import { LayoutChangeEvent, View } from "react-native";
import { Canvas, CanvasRef } from "react-native-wgpu";

export default function HelloTriangle() {
  const ref = React.useRef<CanvasRef>(null);

  const [experience, setExperience] = React.useState<Experience | null>(null)
  const [containerWidth, setContainerWidth] = React.useState(0)
  const [containerHeight, setContainerHeight] = React.useState(0)
  const [isGLReady, setIsGLReady] = React.useState(false)


  React.useEffect(() => {
    if (!experience && !isGLReady && (!ref || !ref.current)) return


    const initExp = async () => {

      const context = ref.current!.getContext("webgpu")!;
      const adapter = await navigator.gpu.requestAdapter();
      setExperience(new Experience(context, adapter));

    }

    initExp()

  }, [isGLReady]);


  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;

    setContainerWidth(width)
    setContainerHeight(height)
    setIsGLReady(true)
    // experience && experience.resize()
  }
  return (
    <View
      onLayout={onLayout}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {
        isGLReady && <Canvas
          ref={ref}
          style={{
            width: containerWidth,
            height: containerHeight
          }} />
      }
    </View>
  );
}

