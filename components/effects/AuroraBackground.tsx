"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const VERTEX_SHADER = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position,0.0,1.0);
}`;

const FRAGMENT_SHADER = `precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

varying vec2 v_texCoord;

float noise(vec2 p){
    return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);
}

void main(){

    vec2 uv=v_texCoord;
    vec2 mouse=u_mouse/u_resolution;

    float time=u_time*0.2;

    vec3 color1=vec3(0.04,0.07,0.15);
    vec3 color2=vec3(0.12,0.14,0.25);
    vec3 color3=vec3(1.0,0.7,0.3)*0.1;

    float n=noise(uv*3.0+time);

    float aurora=sin(uv.x*2.0+time+n)*0.5+0.5;
    aurora*=cos(uv.y*3.0-time*0.5+n)*0.5+0.5;

    float dist=distance(uv,mouse);
    float glow=smoothstep(0.4,0.0,dist)*0.15;

    vec3 finalColor=mix(color1,color2,aurora);
    finalColor+=color3*aurora;
    finalColor+=vec3(1.0,0.8,0.5)*glow;

    gl_FragColor=vec4(finalColor,1.0);
}
`;

interface AuroraBackgroundProps {
  className?: string;
}

export function AuroraBackground({ className }: AuroraBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // This variable is NEVER null.
    const canvas: HTMLCanvasElement = canvasRef.current;

    const context = canvas.getContext("webgl");

    if (!(context instanceof WebGLRenderingContext)) return;

    // This variable is NEVER null.
    const gl: WebGLRenderingContext = context;

    function syncSize() {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    syncSize();

    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(canvas);

    function compileShader(type: number, source: string): WebGLShader {
      const shader = gl.createShader(type);

      if (!shader) {
        throw new Error("Unable to create shader");
      }

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      return shader;
    }

    const program = gl.createProgram();

    if (!program) {
      throw new Error("Unable to create program");
    }

    gl.attachShader(program, compileShader(gl.VERTEX_SHADER, VERTEX_SHADER));
    gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER));

    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();

    if (!buffer) {
      throw new Error("Unable to create buffer");
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    const position = gl.getAttribLocation(program, "a_position");

    gl.enableVertexAttribArray(position);

    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    const mouse = {
      x: canvas.width / 2,
      y: canvas.height / 2,
    };

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();

      mouse.x =
        ((e.clientX - rect.left) / rect.width) * canvas.width;

      mouse.y =
        (1 - (e.clientY - rect.top) / rect.height) * canvas.height;
    }

    window.addEventListener("mousemove", handleMouseMove);

    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;

    function render(time: number) {
      gl.viewport(0, 0, canvas.width, canvas.height);

      if (uTime) gl.uniform1f(uTime, time * 0.001);

      if (uResolution)
        gl.uniform2f(uResolution, canvas.width, canvas.height);

      if (uMouse)
        gl.uniform2f(uMouse, mouse.x, mouse.y);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (!prefersReducedMotion) {
        frame = requestAnimationFrame(render);
      }
    }

    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("block h-full w-full", className)}
      aria-hidden="true"
    />
  );
}