export const Uniforms = /* wgsl */ `
    @group(0) @binding(0) var<uniform> color: vec4f;
    @group(0) @binding(1) var<uniform> time: f32;
`
export const SimpleVS = /* wgsl */ `
    ${Uniforms}

    @vertex fn vs(
        @builtin(vertex_index) vertexIndex : u32
    ) -> @builtin(position) vec4f {
        let pos = array(
            vec2(-1.0, -1.0),
            vec2(-1.0, 1.0),
            vec2(1.0, -1.0),

            vec2(1.0, 1.0),
            vec2(1.0, -1.0),
            vec2(-1.0, 1.0),
        );
            
        return vec4f(pos[vertexIndex], 0.0, 1.0);
    }
`


















export const SimpleFS = /* wgsl */ `
    ${Uniforms}

    @fragment
    fn fs() -> @location(0) vec4f {







        return color;
    }
`
