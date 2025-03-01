//Définition de la structure fragment qui va être feed au fragment shader
struct Fragment{
  @builtin(position) Position : vec4<f32>,
  @location(0) Color : vec4<f32>
};

@vertex//Dit au GPU que c'est une fonction à utiliser pendant la phase de vertex
fn vs_main(@builtin(vertex_index) v_id:u32)-> Fragment{
  var positions = array<vec2<f32>, 3>(
    vec2<f32>(0.0, 0.5),
    vec2<f32>(-0.5, -0.5),
    vec2<f32>(0.5, -0.5)
  );

  //gestion des couleurs faites par le shader de vertex pour ce cas spécifique
  var colors = array<vec3<f32>, 3>(
    vec3<f32>(.9, 0.1, 0.0),
    vec3<f32>(0.0, 0.1, 0.9),
    vec3<f32>(1., 0., 1.)
  );

  //création d'un fragment et assignation d'une couleur dans fragment
  var output: Fragment;
  output.Position = vec4<f32>(positions[v_id], 0.0, 0.6);
  output.Color = vec4<f32>(colors[v_id], 1.0);

  return output;//input du fragment shader
}

@fragment
fn fs_main(fsInput:Fragment)->  @location(0) vec4<f32>{
  return fsInput.Color;
}