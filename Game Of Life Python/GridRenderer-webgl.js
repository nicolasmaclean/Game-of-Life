// Renders grid using webGL and HTML canvas
'use strict';

function main()
{
// retrieves canvas ref
const canvas = document.querySelector("#glCanvas");
const gl = canvas.getContext('webgl');

// vertex shader
const vsGLSL = `
attribute vec4 position;
void main() {
    gl_Position = position;
}
`;

// fragment shader
const fsGLSL = `
precision highp float;
void main() {
    gl_FragColor = vec4(0, 1, 0.5, 1);
}
`;

// loads/creates vertex/fragment shaders
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsGLSL);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsGLSL);

// creates webGL program with the loaded shaders
const prg = createProgram(gl, vertexShader, fragmentShader);

// NOTE! These are only here to unclutter the diagram.
// It is safe to detach and delete shaders once
// a program is linked though it is arguably not common.
// and I usually don't do it.
gl.detachShader(prg, vertexShader);
gl.deleteShader(vertexShader);
gl.detachShader(prg, fragmentShader);
gl.deleteShader(fragmentShader);

const positionLoc = gl.getAttribLocation(prg, 'position');

// in clip space
const vertexPositions = new Float32Array([
    0,   0.7,
  0.5,  -0.7,
 -0.5,  -0.7,
]);

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexPositions, gl.STATIC_DRAW);

gl.enableVertexAttribArray(positionLoc);
gl.vertexAttribPointer(
    positionLoc,  
    2,            // 2 values per vertex shader iteration
    gl.FLOAT,     // data is 32bit floats
    false,        // don't normalize
    0,            // stride (0 = auto)
    0,            // offset into buffer
);

gl.useProgram(prg);

// compute 3 vertices for 1 triangle
gl.drawArrays(gl.TRIANGLES, 0, 3);
}

// creates a shader given the type and source
function createShader(gl, type, source)
{
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
  
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

// creates the program using the given vertex and fragment shaders
function createProgram(gl, vertexShader, fragmentShader)
{
  var program = gl.createProgram();
  
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
 
  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

window.onload = main;