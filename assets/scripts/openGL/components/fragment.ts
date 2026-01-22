
const sdSphere = /* glsl */`
    float sdSphere(vec3 p, float radius) {
        return length(p) - radius;
    }
`

const smoothmin = /* glsl */`
float smoothmin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b-a)/k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}
`


/**
 * Scene is basicly a function that calculate the distance of each scene elements and return the closest object
 * In out case : 
 *        - it's returning an shape blend between the elements using smoothmin 
 *        - it's returning an color blend between the elements using smoothmin math copy
 */
const scene = /* glsl */`
float scene(vec3 p) {

  
  float displacement = sin(5.0 * p.x) * sin(5.0 * p.y) * sin(5.0 * p.z) * (uFactor + sin(uTime))+ sin(uTime) ;
    float sphere1 = sdSphere(p - vec3(1.0 + cos(uTime), 0.7, 0.0), 1.0) + displacement;
    float sphere2 = sdSphere(p + vec3(1.0, 0.5 + sin(uTime)/2.0, 0.0), 1.0);


    /** 
     * COLORS
     * smoothmin math but applied to the shape
     **/
    float h = clamp(0.5 + 0.5 * (sphere2 - (sphere1)) / uBlendingFactor, 0.0, 1.0);
    objectColor = mix(vec3(213./255., 139./255., 230./255.),  vec3(0.0, 0.3, 1.0), h);


    /**
     *  SHAPE
     **/ 
    float distance1 = smoothmin(sphere1, sphere2, uBlendingFactor);
    return distance1 ;
}
`

const raymarch = /* glsl */ `

float raymarch(vec3 ray_origin, vec3 ray_direction) {
  float distance_origin = 0.0;

  for(int i = 0; i < MAX_STEPS; i++) {
    vec3 surface_position = ray_origin + ray_direction * distance_origin;
    float distance_surface = scene(surface_position);

    distance_origin += distance_surface;

    if(distance_origin > MAX_DIST || distance_surface < SURFACE_DIST) {
      break;
    }
  }
  return distance_origin;
}
`

const getNormal = /* glsl */ `

vec3 getNormal(vec3 p) {
  vec2 e = vec2(.01, 0);

  vec3 n = scene(p) - vec3(
    scene(p-e.xyy),
    scene(p-e.yxy),
    scene(p-e.yyx));

  return normalize(n);
}
`

const main = /* glsl */`
void main() {
  vec2 uv = gl_FragCoord.xy/uResolution.xy;
  uv -= 1.;
  uv.x *= uResolution.x / uResolution.y;

  // Light Position
  vec3 lightPosition = vec3(2.0 /** cos(uTime * 0.2)*/, 0.0, 10.0 /** sin(uTime * 0.2)*/);


  vec3 ray_origin = vec3(0.0, 0.0, 5.0);
  vec3 ray_direction = normalize(vec3(uv, -1.0));

  float total_distance = raymarch(ray_origin, ray_direction);
  vec3 surface_position = ray_origin + ray_direction * total_distance; // intersection point (origin + direction * distance) (obvious but i'll be happy of this comment in two weeks)

  vec3 color = vec3(0.0);

  if(total_distance<MAX_DIST) {//Mean has it been intersected
    vec3 normal = getNormal(surface_position);
    vec3 lightDirection = normalize(lightPosition - surface_position);

    float diffuse = max(dot(normal, lightDirection), 0.0);
    
    color = vec3(1.0, 1.0, 1.0) * objectColor * diffuse;
  }

  gl_FragColor = vec4(color, 1.0);
}`




export default /* glsl */ `

precision mediump float;
uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uNoise;
uniform sampler2D uNoise3DTexture;
uniform float uSpeed;

// SPHERE SHAPE
uniform float uForm;
uniform float uRadius;
uniform float uNoiseFactor;
uniform float uNoiseScale;
uniform float uFilament;

//Sphere color
uniform float uRedIntenisty;
uniform float uGreenIntenisty;
uniform float uBlueIntenisty;
uniform float uYellowIntenisty;
uniform float uGlobalLightIntensity;


#define MAX_STEPS 90
#define ATLAS_SIZE 128.0


// float sample3DTexture(vec3 uvw, float size) {
//     // uvw : 0..1
//     float slice = floor(uvw.z * size);

//     // atlas UV
//     float atlasX = uvw.x;
//     float atlasY = (uvw.y + slice) / size; // atlas height = size * size

//     vec2 atlasUV = vec2(atlasX, atlasY);

//     // WebGL1 : texture2D pas texture()
//     return texture2D(uNoise3DTexture, atlasUV).r;
// }




// float fbmt3D2(vec3 p) {
//     float f = 0.0;
//     float amp = 0.5;
//     float freq = 1.0;

//     for(int i = 0; i < 5; i++) {
//         // vec3 uvw = p * freq;
//         // uvw = uvw * 0.5 + 0.5;   
//         // uvw.z += uTime * 0.05;

//         vec3 uvw = p * 0.15;   
// uvw += vec3(0.5); 
// uvw.z += uTime * 0.05 + 50.;

//         f += amp * sample3DTexture(uvw, 128.0);
//         freq *= 2.0;
//         amp *= 0.5;
//     }
//     return f;
// }


// float fbmt3D(vec3 p) {
//     float f = 0.0;
//     float amp = 0.5;
//     float freq = 1.0;

//     for(int i = 0; i < 5; i++) {
//         vec3 uvw = p * freq;
//         uvw = uvw * 0.5 + 0.5;   
//         uvw.z += uTime * 0.05;

//         f += amp * sample3DTexture(uvw, 128.0);
//         freq *= 2.0;
//         amp *= 0.5;
//     }
//     return f;
// }

float sdSphere(vec3 p, float radius) {
  return length(p) - radius;
}
/*
 * TEXTURE 2D NOISE
*/
float noise( in vec3 x ) {
  vec3 p = floor(x);
  vec3 f = fract(x);
  f = f*f*(3.0-2.0*f);

  vec2 uv = (p.xy+vec2(37.0,239.0)*p.z) + f.xy;
  vec2 tex = texture2D(uNoise,(uv+0.5)/256.0,0.0).yx;

  return mix(tex.x, tex.y, f.z) * 2.0 - 1.0;
}
/** */
float fbm(vec3 p) {

  p += vec3(
    noise(p + 17.0),
    noise(p + 31.0),
    noise(p + 73.0)
  ) * 0.4;


  vec3 q = p + uTime * 0.5 * vec3(1.0, -0.2, -1.0) * uSpeed; // Speed

  float f = 0.0;
  float scale = uNoiseScale;//0.5; // How splitted it is
  float factor = uNoiseFactor;//2.02; // How noisy it is

  for (int i = 0; i < 3; i++) {
      f += scale * noise(q);
      q *= factor;
      factor += 0.21;
      scale *= 0.5;
  }

  return f * uForm; // Ability to multiply by a factor to have a smaller sphere (<0)
}
/* END */

// float cheapNoise(vec3 p) {
//     return fract(sin(dot(p ,vec3(127.1,311.7, 74.7))) * 43758.5453) * 2.0 - 1.0;
// }

// float cheapFBM(vec3 p) {
//     float f = 0.0;
//     float amp = uNoiseScale;
//     float freq = uNoiseFactor;

//     for(int i=0;i<4;i++) { // on peut réduire à 4 octaves pour encore plus de perf
//         f += amp * cheapNoise(p * freq);
//         freq *= 2.0;
//         amp *= 0.5;
//     }
//     return f;
// }

// float fbm(vec3 p) {
//     float f = 0.0;
//     float amp = 0.5;
//     float freq = 1.0;

//     for(int i = 0; i < 5; i++) {
//         vec3 uvw = p * freq / ATLAS_SIZE;
//         uvw.z += uTime * 0.05; // scroll du bruit en Z
//         f += amp * sample3DTexture(uvw, 128.0);
//         freq *= 2.0;
//         amp *= 0.5;
//     }
//     return f;
// }


/* 
 * VOLUMETRIC COMPUTE NOISE 
 
float hash(vec3 p)
{
    p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 p)
{
    vec3 i = floor(p);
    vec3 f = fract(p);

    // Smooth interpolation
    f = f * f * (3.0 - 2.0 * f);

    float n000 = hash(i + vec3(0,0,0));
    float n100 = hash(i + vec3(1,0,0));
    float n010 = hash(i + vec3(0,1,0));
    float n110 = hash(i + vec3(1,1,0));
    float n001 = hash(i + vec3(0,0,1));
    float n101 = hash(i + vec3(1,0,1));
    float n011 = hash(i + vec3(0,1,1));
    float n111 = hash(i + vec3(1,1,1));

    float nx00 = mix(n000, n100, f.x);
    float nx10 = mix(n010, n110, f.x);
    float nx01 = mix(n001, n101, f.x);
    float nx11 = mix(n011, n111, f.x);

    float nxy0 = mix(nx00, nx10, f.y);
    float nxy1 = mix(nx01, nx11, f.y);

    return mix(nxy0, nxy1, f.z) * 2.0 - 1.0;
}

float fbm(vec3 p)
{
    float f = 0.0;
    float amp = 0.5;
    float freq = 1.0;

    for(int i = 0; i < 5; i++)
    {
        f += amp * noise(p * freq);
        freq *= 2.0;
        amp *= 0.5;
    }

    return f;
}
*/
float scene(vec3 p) {
  float displacement = noise(p) * .65 * sin(uTime * uSpeed) * cos(uTime * uSpeed);
  float distance = sdSphere(p + vec3(0, 0, 2), uRadius) + displacement;
  float f = fbm(p);
  
  return -distance + f;
}

const vec3 SUN_POSITION = vec3(-1.0, 0.0, 0.0);
const float MARCH_SIZE = 0.08;





vec4 raymarch(vec3 rayOrigin, vec3 rayDirection) {
  float depth = 0.0;
  vec3 p = rayOrigin + depth * rayDirection;
  vec3 sunDirection = normalize(SUN_POSITION);

  vec4 res = vec4(0.0);

  for (int i = 0; i < MAX_STEPS; i++) {
    // float angle = uTime * 0.5; // rotation speed

// mat2 rotY = mat2(cos(angle), -sin(angle),
//                  sin(angle),  cos(angle));

// // Rotate sphere around Y-axis
// vec3 p_rotated = vec3(rotY * p.xz, p.y - 2.);

// Use p_rotated in scene() instead of p


    float density = scene(p);
    if (res.a > 0.98) break;

    // We only draw the density if it's greater than 0
    if (density > .0 && density < uFilament) { /// &&  density < 0.15*/ -> create strokes
      // Directional derivative
      // For fast diffuse lighting


      float red_light_intensity = uRedIntenisty;
      vec3 red_light_color = vec3(1.,0.,0.);
      vec3 red_light_position = vec3(-1.,0.,2.);
      vec3 red_light_direction = normalize(red_light_position);;

      float green_light_intensity = uGreenIntenisty;
      vec3 green_light_color = vec3(0.,1.,0.);
      vec3 green_light_position = vec3(0.,-1.,2.);
      vec3 green_light_direction =  normalize(green_light_position);

      float blue_light_intensity = uBlueIntenisty;
      vec3 blue_light_color = vec3(0.,0.,1.);
      vec3 blue_light_position = vec3(1.,0.,2.);
      vec3 blue_light_direction =  normalize(blue_light_position);

      float yellow_light_intensity = uYellowIntenisty;
      vec3 yellow_light_color = vec3(1.,166./255.,0.);
      vec3 yellow_light_position = vec3(.0,1.,2.);
      vec3 yellow_light_direction =  normalize(yellow_light_position);



      vec3 lin = vec3(0.60,0.60,0.75) * 1.1;


      float diffuse = clamp((scene(p) - scene(p + 0.3 * red_light_direction)) / 0.3, 0.0, 1.0 );
      lin += red_light_color * diffuse * red_light_intensity;

      diffuse = clamp((scene(p) - scene(p + 0.3 * blue_light_direction)) / 0.3, 0.0, 1.0 );
      lin += blue_light_color * diffuse * blue_light_intensity;

      diffuse = clamp((scene(p) - scene(p + 0.3 * green_light_direction)) / 0.3, 0.0, 1.0 );
      lin += green_light_color * diffuse * green_light_intensity;
   
      diffuse = clamp((scene(p) - scene(p + 0.3 * yellow_light_direction)) / 0.3, 0.0, 1.0 );
      lin += yellow_light_color * diffuse * yellow_light_intensity;



      vec4 color = vec4(mix(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0), density), density );
      color.rgb *= lin;


      /**
       * 1 light -> 1
       * 2 lights -> 0.5 to 0.6 even 7or eight for abrighter result
       * 3 lights -> 0.4 to 0.5 looks quite good
       * 5 lights -> 0.35 to 0.4 looks good
       */
      color.rgb *= color.a * uGlobalLightIntensity; // Here I decrease intensity to compense the lights additions. For 2 a value between 0.3 and 0.5 seems ok. I propose to addition. the lights intensity (which arer < 1 and > 0), divide it by 4 and then we have the reduction factor


      res += color * (1.0 - res.a);
    }

    depth += MARCH_SIZE;
    p = rayOrigin + depth * rayDirection;
  }

  return res;
}


void main() {
  vec2 uv = gl_FragCoord.xy/uResolution.xy;
  uv -= 0.5;
  uv.x *= uResolution.x / uResolution.y;

  // Ray Origin - camera
  vec3 ro = vec3(0.0, 0.0, 5.0);
  // Ray Direction
  vec3 rd = normalize(vec3(uv, -1.0));
  
  vec3 color = vec3(0.0);

      // vec3 test = vec3(0.5, 0.5, 0.5); 
    // float noiseValue = sample3DTexture(test, 128.0);
    
  // Sun and Sky
  vec3 sunDirection = normalize(SUN_POSITION);
  float sun = clamp(dot(sunDirection, rd), 0.0, 1.0 );
  // Base sky color
  color = vec3(0.114,0.118,0.134);
  // // Add vertical gradient
  // color -= 0.8 * vec3(0.90,0.75,0.90) * rd.y;
  // // Add sun color to sky
  // color += 0.5 * vec3(1.0,0.5,0.3) * pow(sun, 10.0);

  // Cloud
  vec4 res = raymarch(ro, rd);
  color = color * (1.0 - res.a) + res.rgb;

  gl_FragColor = vec4(color, 1.0);
}



`




