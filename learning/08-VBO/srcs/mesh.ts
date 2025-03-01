export class SuperMesh{
  buffer:GPUBuffer//accès à la mémoire actuelle des vertex dans la cg
  bufferLayout:GPUVertexBufferLayout//type de mémoire

  constructor(device:GPUDevice){
    //
    const vertices:Float32Array = new Float32Array(
      [
        -0.5, 0.5, 0.0, 1.0, 1.0,//tl
        -0.5, -0.5, 1.0, 0.0, 1.0,//bl
        0.5, 0.5, 1.0, 1.0, 0.0,//tr
        0.5, -0.5, 0.0, 0.36, 1.0//br
      ]
    );

    const usage: GPUBufferUsageFlags = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST;

    const descriptor : GPUBufferDescriptor = {
      size: vertices.byteLength,
      usage: usage,
      mappedAtCreation: true
    };

    this.buffer = device.createBuffer(descriptor);
    new Float32Array(this.buffer.getMappedRange()).set(vertices);
    this.buffer.unmap();

    this.bufferLayout = {
      arrayStride: 20,
      attributes: [
        {
          shaderLocation: 0,
          format : "float32x2",
          offset : 0
        },
        {
          shaderLocation: 1,
          format: "float32x3",
          offset: 8//2 float = 8bytes 
        }
      ]
    }
  }
}