export const Uniforms = /* wgsl */ `
    @group(0) @binding(0) var<uniform> time: f32;
    @group(0) @binding(1) var<uniform> resolution: vec2f;
    @group(0) @binding(2) var<uniform> uFactor: f32;
    @group(0) @binding(3) var<uniform> uBlendingFactor: f32;
`
export const SimpleVS = /* wgsl */ `
    ${Uniforms}

    struct VertexOutput {
        @builtin(position) position: vec4<f32>,
        @location(0) uv: vec2<f32>,
    };

    @vertex fn vs(@builtin(vertex_index) vertexIndex : u32) -> VertexOutput {
        let pos = array(
            vec2(-1.0, -1.0),
            vec2(-1.0, 1.0),
            vec2(1.0, -1.0),

            vec2(1.0, 1.0),
            vec2(1.0, -1.0),
            vec2(-1.0, 1.0),
        );

        let uv = array(
            vec2(0.0, 0.0),
            vec2(0.0, 1.0),
            vec2(1.0, 0.0),

            vec2(1.0, 1.0),
            vec2(1.0, 0.0),
            vec2(0.0, 1.0),
        );
      
    
        var output: VertexOutput;
        output.position = vec4f(pos[vertexIndex], 0.0, 1.0);
        output.uv = uv[vertexIndex]; // pass UVs to fragment
        return output;
    // return vec4f(pos[vertexIndex], 0.0, 1.0);
    }
`






const fns = /* wgsl */`

fn sdSphere(p: vec3f, radius: f32) -> f32 {
    return length(p) - radius;
}

fn smoothmin(a: f32, b: f32, k: f32) -> f32 {
    let h: f32 = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
}

fn scene(p: vec3f) -> f32 {
    let displacement: f32 = sin(5.0 * p.x) * sin(5.0 * p.y) * sin(5.0 * p.z) * (uFactor + sin(time))
                             + sin(time);
    let sphere1: f32 = sdSphere(p - vec3f(1.0 + cos(time), 0.7, 0.0), 1.0) + displacement;
    let sphere2: f32 = sdSphere(p + vec3f(1.0, 0.5 + sin(time)/2.0, 0.0), 1.0);

    // COLORS
    let h: f32 = clamp(0.5 + 0.5 * (sphere2 - sphere1) / uBlendingFactor, 0.0, 1.0);
    objectColor = mix(vec3f(213.0/255.0, 139.0/255.0, 230.0/255.0), vec3f(0.0, 0.3, 1.0), h);

    // SHAPE
    let distance1: f32 = smoothmin(sphere1, sphere2, uBlendingFactor);
    return distance1;
}

fn raymarch(ray_origin: vec3f, ray_direction: vec3f) -> f32 {
    var distance_origin: f32 = 0.0;
    for(var i: i32 = 0; i < MAX_STEPS; i = i + 1) {
        let surface_position: vec3f = ray_origin + ray_direction * distance_origin;
        let distance_surface: f32 = scene(surface_position);
        distance_origin = distance_origin + distance_surface;

        if(distance_origin > MAX_DIST || distance_surface < SURFACE_DIST) {
            break;
        }
    }
    return distance_origin;
}

fn getNormal(p: vec3f) -> vec3f {
    let e: vec2f = vec2f(0.01, 0.0);
    let n: vec3f = vec3f(
        scene(p - vec3f(e.x, e.y, e.y)),
        scene(p - vec3f(e.y, e.x, e.y)),
        scene(p - vec3f(e.y, e.y, e.x))
    );
    return normalize(scene(p) - n);
}

`



export const SimpleFS = /* wgsl */ `
    ${Uniforms}
    
    const MAX_STEPS: i32 = 50;
    const MAX_DIST: f32 = 100.0;
    const SURFACE_DIST: f32 = 0.001;

    var<private> objectColor: vec3f = vec3f(1., 1., 1.);

   struct VertexOutput {
        @builtin(position) position: vec4<f32>,
        @location(0) uv: vec2<f32>,
    };


    ${fns}
    
    @fragment
    fn fs(input : VertexOutput) -> @location(0) vec4f {

        var uv: vec2f = input.position.xy / resolution.xy;
        uv -= 1.;
        uv.x *= resolution.x / resolution.y;
        uv.y *= -1.;


        // Light Position
        let lightPosition: vec3f = vec3f(2.0 /** cos(time * 0.2)*/, 0.0, 10.0 /** sin(time * 0.2)*/);
        
        var ray_origin: vec3f = vec3f(0.0, 0.0, 5.0);
        var ray_direction: vec3f = normalize(vec3f(uv, -1.0));


        let total_distance: f32 = raymarch(ray_origin, ray_direction);
        let surface_position: vec3f = ray_origin + ray_direction * total_distance; // intersection point (origin + direction * distance) (obvious but i'll be happy of this comment in two weeks)

        var color: vec3f = vec3f(0.0);
        
        
        
        if(total_distance < MAX_DIST) {
            let normal: vec3f = getNormal(surface_position);
            let lightDirection: vec3f = normalize(lightPosition - surface_position);

            let diffuse: f32 = max(dot(normal, lightDirection), 0.0);
            color = vec3f(1.0, 1.0, 1.0) * objectColor * diffuse;
        }

        return vec4f(color, 1.0);
    }
`
