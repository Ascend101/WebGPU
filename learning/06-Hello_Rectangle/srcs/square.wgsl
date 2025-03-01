struct Fragment {
  @builtin(position) Position : vec4<f32>,  // (1) GPU uses this as the final screen position of each vertex
  @location(0) Color : vec4<f32>  // This is NOT a builtin, it's just normal shader data passed to the fragment shader
};

@vertex
fn vs_main(@builtin(vertex_index) v_id: u32) -> Fragment {  // (2) `v_id` holds the index of the vertex WebGPU is processing
  var positions = array<vec2<f32>, 6>(
    vec2<f32>(-0.5, 0.5), // Top left vertex
    vec2<f32>(-0.5, -0.5),// Bottom-left vertex
    vec2<f32>(0.5, -0.5), // Bottom-right vertex
    vec2<f32>(-0.5, 0.5), // Top left vertex
    vec2<f32>(0.5, 0.5),  // Top right vertex
    vec2<f32>(0.5, -0.5)  //Bottom right vertex
  );

  var colors = array<vec3<f32>, 1>(
    vec3<f32>(1.0, 0.7, 0.8)
  );

  var output: Fragment;
  output.Position = vec4<f32>(positions[v_id], 0.0, 1.0);  // (3) Assign the position of this vertex in 3D space
  output.Color = vec4<f32>(colors[v_id], 1.0);  // This is normal data, NOT a builtin
  return output;
}

@fragment
fn fs_main(@location(0) Color: vec4<f32>) -> @location(0) vec4<f32> {
  return Color;  // (4) Uses the color passed from the vertex shader, NOT a builtin
}
