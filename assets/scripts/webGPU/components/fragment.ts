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
uniform float uBlendingFactor;
uniform float uFactor;

#define MAX_STEPS 50
#define MAX_DIST 100.0
#define SURFACE_DIST 0.001

vec3 objectColor = vec3(1.0, 1.0, 1.0);

${sdSphere}
${smoothmin}
${scene}
${raymarch}
${getNormal}


${main}

`





