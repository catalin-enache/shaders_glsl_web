void getFinalColor(in vec4 color, out vec4 final) {
  final = color * vec4(0.2);
}

void main() {
  vec4 final;
  getFinalColor(vec4(0.0, 1.0, 0.0, 1.0), final);
  gl_FragColor = final;
}