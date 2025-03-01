struct Fragment{
  @builtin(position) pos:vec4f,
  @location(0) interpolated:vec4f,
}

@vertex
fn vs_main(@location(0) vx_pos : vec2<f32>, @location(1) vx_col: vec3<f32>) -> Fragment {  // (2) `v_id` holds the index of the vertex WebGPU is processing
  var outFrag:Fragment;
  outFrag.pos = vec4f(vx_pos, 0.0, 1.0);
  outFrag.interpolated = vec4f(vx_col, 1.0);
  return outFrag;
}

@fragment
fn fs_main(outFrag:Fragment) -> @location(0) vec4<f32> {
  return outFrag.interpolated;
}
