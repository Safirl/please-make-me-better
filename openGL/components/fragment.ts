const sdSphere = `
    float sdSphere(vec3 p, float radius) {
        return length(p) - radius;
    }
`

const smoothmin = `
float smoothmin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b-a)/k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}
`

const scene = `
float scene(vec3 p) {
    float sphere1 = sdSphere(p - vec3(1.0 + cos(uTime), 0.7, 0.0), 1.0);
    float sphere2 = sdSphere(p + vec3(1.0, 0.5 + sin(uTime)/2.0, 0.0), 1.0);

    float distance1 = smoothmin(sphere1, sphere2, uBlendingFactor);
    return distance1;
}
`

const raymarch = `

float raymarch(vec3 ro, vec3 rd) {
  float dO = 0.0;
  vec3 color = vec3(0.0);

  for(int i = 0; i < MAX_STEPS; i++) {
    vec3 p = ro + rd * dO;
    float dS = scene(p);

    dO += dS;

    if(dO > MAX_DIST || dS < SURFACE_DIST) {
        break;
    }
  }
  return dO;
}
`

const getNormal = `

vec3 getNormal(vec3 p) {
  vec2 e = vec2(.01, 0);

  vec3 n = scene(p) - vec3(
    scene(p-e.xyy),
    scene(p-e.yxy),
    scene(p-e.yyx));

  return normalize(n);
}
`

const main = `
void main() {
  vec2 uv = gl_FragCoord.xy/uResolution.xy;
  uv -= 1.;
  uv.x *= uResolution.x / uResolution.y;

  // Light Position
  vec3 lightPosition = vec3(-10.0 * cos(uTime * 0.2), 10.0, 10.0 * sin(uTime * 0.2));

  vec3 ro = vec3(0.0, 0.0, 5.0);
  vec3 rd = normalize(vec3(uv, -1.0));

  float d = raymarch(ro, rd);
  vec3 p = ro + rd * d;

  vec3 color = vec3(0.0);

  if(d<MAX_DIST) {
    vec3 normal = getNormal(p);
    vec3 lightDirection = normalize(lightPosition - p);

    float diffuse = max(dot(normal, lightDirection), 0.0);
    color = vec3(1.0, 1.0, 1.0) * diffuse;
  }

  gl_FragColor = vec4(color, 1.0);
}`

export default `

precision mediump float;
uniform float uTime;
uniform vec2 uResolution;
uniform float uBlendingFactor;

#define MAX_STEPS 50
#define MAX_DIST 100.0
#define SURFACE_DIST 0.001

${sdSphere}
${smoothmin}
${scene}
${raymarch}
${getNormal}


${main}

`





