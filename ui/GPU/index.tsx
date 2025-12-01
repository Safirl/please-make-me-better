
import React from "react";
import { LayoutChangeEvent, PixelRatio, View } from "react-native";
import { Canvas, CanvasRef } from "react-native-wgpu";
import {
  redFragWGSL,
  triangleVertWGSL
} from "./triangle";


export default function HelloTriangle() {
  const ref = React.useRef<CanvasRef>(null);

  const [containerWidth, setContainerWidth] = React.useState(0)
  const [containerHeight, setContainerHeight] = React.useState(0)
  const [isGLReady, setIsGLReady] = React.useState(false)
  console.log('pass here ? ')
  React.useEffect(() => {
    console.log('pass here ? ')

    const helloTriangle = async () => {
      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) {
        throw new Error("No adapter");
      }
      const device = await adapter.requestDevice();
      const presentationFormat = navigator.gpu.getPreferredCanvasFormat();

      const context = ref.current!.getContext("webgpu")!;
      const canvas = context.canvas as HTMLCanvasElement;
      canvas.width = canvas.clientWidth * PixelRatio.get();
      canvas.height = canvas.clientHeight * PixelRatio.get();

      if (!context) {
        throw new Error("No context");
      }

      context.configure({
        device,
        format: presentationFormat,
        alphaMode: "opaque",
      });

      const pipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: {
          module: device.createShaderModule({
            code: triangleVertWGSL,
          }),
          entryPoint: "main",
        },
        fragment: {
          module: device.createShaderModule({
            code: redFragWGSL,
          }),
          entryPoint: "main",
          targets: [
            {
              format: presentationFormat,
            },
          ],
        },
        primitive: {
          topology: "triangle-list",
        },
      });

      const commandEncoder = device.createCommandEncoder();

      const textureView = context.getCurrentTexture().createView();

      const renderPassDescriptor: GPURenderPassDescriptor = {
        colorAttachments: [
          {
            view: textureView,
            clearValue: [0, 0, 0, 1],
            loadOp: "clear",
            storeOp: "store",
          },
        ],
      };

      const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
      passEncoder.setPipeline(pipeline);
      passEncoder.draw(6);
      passEncoder.end();

      device.queue.submit([commandEncoder.finish()]);

      context.present();
    };


    helloTriangle();


  }, [ref]);


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

