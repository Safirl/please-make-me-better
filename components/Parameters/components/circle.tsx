// Based on shader https://reactbits.dev/backgrounds/iridescence
import {
  Canvas,
  Fill,
  Shader,
  Skia,
  useClock,
} from "@shopify/react-native-skia";
import React from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";

export default function Circle() {

  const shaderSource = Skia.RuntimeEffect.Make(`
uniform float2 iResolution;
uniform float iTime;

vec3 palette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);

    return a + b*cos(6.28318*(c*t+d));
}

vec3 rgb(float r, float g, float b) {
	return vec3(r / 255.0, g / 255.0, b / 255.0);
}

vec4 circle(vec2 uv, vec2 pos, float rad, vec3 color) {
	float d = length(pos - uv) - rad;
	float t = clamp(d, 0.0, 1.0);
	return vec4(color, 1.0 - t);
}

half4 main(vec2 fragCoord) {
    // vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
    // vec2 uv0 = uv;
    // vec3 finalColor = vec3(0.0);
    
    // for (float i = 0.0; i < 4.0; i++) {
    //     uv = fract(uv * 1.5) - 0.5;

    //     float d = length(uv) * exp(-length(uv0));

    //     vec3 col = palette(length(uv0) + i*0.4 + iTime*0.4);

    //     d = sin(d*8.0 + iTime)/8.0;
    //     d = abs(d);

    //     d = pow(0.01 / d, 1.2);

    //     finalColor += col * d;
    // }
        
    // return vec4(finalColor, 1.0);

    vec2 uv = fragCoord.xy;
    vec2 center = iResolution.xy * 0.5;
    float radius = 0.25 * iResolution.y;

      // Background layer
    vec4 layer1 = vec4(rgb(210.0, 222.0, 228.0), 1.0);
    
    // Circle
    vec3 red = rgb(225.0, 95.0, 60.0);
    vec4 layer2 = circle(uv, center, radius, red);
    
    // Blend the two
    return mix(layer1, layer2, layer2.a);
}
`);

  const clock = useClock();
  const width = useSharedValue(0)
  const height = useSharedValue(0)


  // Create uniforms using useDerivedValue from reanimated
  const uniforms = useDerivedValue(() => {
    let value = {
      iResolution: [width.get(), height.get()],
      iTime: clock.get() / 1000,
    }
    return value;
  }, [clock, width, height]);

  const onLayout = (event: LayoutChangeEvent) => {
    width.set(event.nativeEvent.layout.width)
    height.set(event.nativeEvent.layout.height)
  }

  if (!shaderSource) return null;

  return (
    <View onLayout={onLayout} style={styles.container}>
    <Canvas style={styles.canvas}>
      <Fill>
        <Shader source={shaderSource} uniforms={uniforms} />
      </Fill>
    </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1
  },

  container: {
    flex: 1
  }
})

Circle.displayName = "Circle";
