struct Fragment{
  @builtin(position) pos:vec4f,
  @location(0) interpolated:vec4f,
}

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
  var outFrag:Fragment;
  outFrag.pos = vec4f(positions[v_id], 0.0, 1.0);
  switch v_id {
    case 0, 3: {outFrag.interpolated = vec4f(0.0, 1.0, 1.0, 1.0);}
    case 1: {outFrag.interpolated = vec4f(1.0, 0.0, 1.0, 1.0);}
    case 4:{outFrag.interpolated = vec4f(1.0, 1.0, 0.0, 1.0);}
    case default:{outFrag.interpolated = vec4f(0.0, 0.36, 1.0, 1.0);}
  }
  return outFrag;
}

@fragment
fn fs_main(outFrag:Fragment) -> @location(0) vec4<f32> {
  let black = vec4<f32>(0.0, 0.0, 0.0, 1.0);
  let reduced = outFrag.pos.xy / 7.5;
  let check2 = sin(reduced.y + reduced.x) < 0.5;
  let grid = vec2u(outFrag.pos.xy)/8;
  let check = (grid.x + grid.y) % 2 == 1;
  return select(black, outFrag.interpolated, check && check2);
}
