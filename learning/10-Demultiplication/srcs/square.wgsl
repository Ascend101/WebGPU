struct Fragment{
  @builtin(position) pos:vec4f,
  @location(0) gradient:vec4f,
}

struct Uni{
  tps:f32,
  scale:vec2f,
  offset: vec2f
}

@group(0)@binding(0) var <uniform> uni:Uni;

@vertex
fn vs_main(@location(0) vx_pos : vec2<f32>) -> Fragment {  // (2) `v_id` holds the index of the vertex WebGPU is processing
  var outFrag:Fragment;
  outFrag.pos = vec4f(vx_pos* uni.scale + uni.offset , 0.0, 1.0);
  outFrag.gradient = vec4f(1.0-clamp(distance(vec2f(-0.5, -0.5),outFrag.pos.xy), 0.0, 1.0), 0.0, 0.0, 1.0);
  return outFrag;
}

@fragment
fn fs_main(outFrag:Fragment) -> @location(0) vec4<f32> {
  return outFrag.gradient;
}
