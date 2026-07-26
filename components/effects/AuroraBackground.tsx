"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Ported 1:1 from stitch_the_champa_experience/shader/code.html.
 * Vertex + fragment shader source, uniforms, and mouse-tracking logic
 * are unchanged from the export. Only the mounting mechanism (React
 * ref + effect instead of a raw <script>) is new.
 */

const VERTEX_SHADER = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

varying vec2 v_texCoord;

float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 uv = v_texCoord;
    vec2 mouse = u_mouse / u_resolution;

    // Aurora effect
    float time = u_time * 0.2;
    vec3 color1 = vec3(0.04, 0.07, 0.15); // Deep Navy
    vec3 color2 = vec3(0.12, 0.14, 0.25); // Mid Navy
    vec3 color3 = vec3(1.0, 0.7, 0.3) * 0.1; // Amber Glow

    float n = noise(uv * 3.0 + time);
    float aurora = sin(uv.x * 2.0 + time + n) * 0.5 + 0.5;
    aurora *= cos(uv.y * 3.0 - time * 0.5 + n) * 0.5 + 0.5;

    // Mouse interactivity
    float dist = distance(uv, mouse);
    float glow = smoothstep(0.4, 0.0, dist) * 0.15;

    vec3 finalColor = mix(color1, color2, aurora);
    finalColor += color3 * aurora;
    finalColor += vec3(1.0, 0.8, 0.5) * glow;

    gl_FragColor = vec4(finalColor, 1.0);
}`;

interface AuroraBackgroundProps {
  className?: string;
}

export function AuroraBackground({ className }: AuroraBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      if (!canvas) return;
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(canvas);
    syncSize();

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl || !(gl instanceof WebGLRenderingContext)) {
      resizeObserver.disconnect();
      return;
    }

    function compileShader(type: number, src: string) {
      const shader = gl!.createShader(type)!;
      gl!.shaderSource(shader, src);
      gl!.compileShader(shader);
      return shader;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, compileShader(gl.VERTEX_SHADER, VERTEX_SHADER));
    gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let rafId: number;
    function render(t: number) {
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      if (uTime) gl!.uniform1f(uTime, t * 0.001);
      if (uRes) gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      if (uMouse) gl!.uniform2f(uMouse, mouse.x, mouse.y);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(render);
      }
    }
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("block h-full w-full", className)}
    />
  );
}
