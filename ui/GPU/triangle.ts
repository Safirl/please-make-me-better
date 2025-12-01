export const triangleVertWGSL = `@vertex
fn main(
  @builtin(vertex_index) VertexIndex : u32
) -> @builtin(position) vec4f {
  var pos = array<vec2f, 6>(
    vec2(-1, -1),
    vec2(-1, 1),
    vec2(1, -1),

    vec2(1, 1),
    vec2(1, -1),
    vec2(-1, 1),

  );

  return vec4f(pos[VertexIndex], 0.0, 1.0);
}`;

export const redFragWGSL = `@fragment
fn main() -> @location(0) vec4f {
  return vec4(1.0, 0.0, 0.0, 1.0);
}`;