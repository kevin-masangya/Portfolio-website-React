import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform float u_speed;
  uniform float u_scale;
  uniform float u_rotation;
  uniform float u_flow;
  uniform float u_warp;
  uniform float u_variation;
  uniform float u_sheen;
  uniform float u_glow;
  uniform float u_brightness;
  uniform float u_grain;
  uniform float u_fade;
  uniform float u_opacity;
  uniform float u_mouse_strength;
  uniform float u_intro;
  uniform float u_mouse_interaction;
  uniform float u_light_mode;
  uniform float u_quality;
  uniform vec3 u_color;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += noise(p) * amplitude;
      p = p * 2.03 + vec2(17.1, 9.2);
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = uv - 0.5;
    p.x *= u_resolution.x / u_resolution.y;
    float rotation = u_rotation * 0.0174532925;
    p = mat2(cos(rotation), -sin(rotation), sin(rotation), cos(rotation)) * p;

    vec2 mouse = (u_mouse - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);
    float mouseFalloff = exp(-length(p - mouse) * 2.2) * u_mouse_interaction;
    p += normalize(p - mouse + vec2(0.0001)) * mouseFalloff * u_mouse_strength * 0.13;

    float time = u_time * u_speed;
    float scale = max(0.2, u_scale);
    float turbulence = fbm(p * (2.4 + u_variation * 0.22) + vec2(time * 0.12, -time * 0.08));
    vec2 warped = p * scale;
    warped.x += sin(warped.y * 2.6 + time * u_flow + turbulence * 4.0) * u_warp;
    warped.y += cos(warped.x * 2.0 - time * u_flow * 0.7) * u_warp * 0.55;

    float streamA = 1.0 - abs(sin(warped.x * 3.0 + warped.y * 2.1 + time * u_flow + turbulence * 3.2));
    float streamB = 1.0 - abs(sin(warped.x * 1.7 - warped.y * 3.8 - time * u_flow * 0.66 + turbulence * 2.4));
    float bands = pow(max(streamA, 0.0), 9.0) * 0.7 + pow(max(streamB, 0.0), 13.0) * 0.48;
    float centerGlow = exp(-length(warped - vec2(0.08, -0.04)) * 2.9) * 0.46;
    float mouseGlow = exp(-length(p - mouse) * 5.0) * mouseFalloff * 0.48;
    float intensity = (bands + centerGlow + mouseGlow) * (0.72 + turbulence * 0.65);
    intensity += u_sheen * pow(max(0.0, 1.0 - abs(p.y + p.x * 0.3 + sin(time * 0.3) * 0.2)), 12.0);
    intensity *= smoothstep(0.0, 0.9, u_intro);
    intensity *= mix(1.0, 0.42, clamp(u_quality, 0.0, 1.0));

    float edgeFade = 1.0 - smoothstep(0.3, 0.92, length(p) + u_fade * 0.4);
    float grain = (hash(gl_FragCoord.xy + floor(u_time * 24.0)) - 0.5) * u_grain;
    vec3 background = u_light_mode > 0.5 ? vec3(0.08, 0.025, 0.035) : vec3(0.012, 0.006, 0.009);
    vec3 color = background + u_color * intensity * (0.55 + u_glow * 1.3) * u_brightness;
    color += u_color * pow(clamp(intensity, 0.0, 1.0), 2.0) * u_glow * 0.42;
    color += grain;
    float alpha = clamp((0.26 + intensity * 0.72) * edgeFade * u_opacity, 0.0, 1.0);
    gl_FragColor = vec4(color, alpha);
  }
`;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function parseColor(color) {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
  if (!match) return [1, 0, 0];
  return match.slice(1).map((channel) => parseInt(channel, 16) / 255);
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) {
    console.error("DarkVeil could not create a WebGL shader.");
    return null;
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("DarkVeil shader compilation failed:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function DarkVeil({
  color = "#ff0000",
  speed = 1,
  scale = 1,
  rotation = 0,
  flow = 2.2,
  warp = 0.6,
  variation = 5,
  sheen = 0,
  glow = 0.4,
  brightness = 0.001,
  grain = 0.03,
  quality = 0.5,
  fade = 0,
  opacity = 1,
  mouseInteraction = true,
  mouseStrength = 1,
  intro = true,
  lightMode = false,
  className = "",
}) {
  const canvasRef = useRef(null);
  const settingsRef = useRef(null);

  useEffect(() => {
    settingsRef.current = {
      color,
      speed,
      scale,
      rotation,
      flow,
      warp,
      variation,
      sheen,
      glow,
      brightness,
      grain,
      quality,
      fade,
      opacity,
      mouseInteraction,
      mouseStrength,
      intro,
      lightMode,
    };
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return undefined;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: "low-power",
      premultipliedAlpha: false,
    });
    if (!gl) {
      console.error("DarkVeil requires WebGL, which is unavailable in this browser.");
      return undefined;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) {
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
      return undefined;
    }

    const program = gl.createProgram();
    if (!program) {
      console.error("DarkVeil could not create a WebGL program.");
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return undefined;
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("DarkVeil program linking failed:", gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return undefined;
    }

    const buffer = gl.createBuffer();
    if (!buffer) {
      console.error("DarkVeil could not create a WebGL buffer.");
      gl.deleteProgram(program);
      return undefined;
    }

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const uniforms = Object.fromEntries(
      [
        "u_resolution",
        "u_mouse",
        "u_time",
        "u_speed",
        "u_scale",
        "u_rotation",
        "u_flow",
        "u_warp",
        "u_variation",
        "u_sheen",
        "u_glow",
        "u_brightness",
        "u_grain",
        "u_fade",
        "u_opacity",
        "u_mouse_strength",
        "u_intro",
        "u_mouse_interaction",
        "u_light_mode",
        "u_quality",
        "u_color",
      ].map((name) => [name, gl.getUniformLocation(program, name)]),
    );

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
    let frame = 0;
    let startTime = 0;
    let visible = true;
    let alive = true;
    let scrollFrame = 0;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, Math.max(0.5, settingsRef.current.quality * 2));
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const updateMouse = (event) => {
      const rect = host.getBoundingClientRect();
      const inside = event.clientX >= rect.left && event.clientX <= rect.right
        && event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (inside) {
        mouse.targetX = clamp((event.clientX - rect.left) / rect.width, 0, 1);
        mouse.targetY = 1 - clamp((event.clientY - rect.top) / rect.height, 0, 1);
      }
    };

    const updateParallax = () => {
      scrollFrame = 0;
      const offset = clamp(-host.getBoundingClientRect().top * 0.13, 0, 110);
      canvas.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateParallax);
    };

    const draw = (now) => {
      frame = 0;
      if (!alive || !visible) return;
      if (!startTime) startTime = now;
      const settings = settingsRef.current;
      const elapsed = reduceMotion ? 0 : (now - startTime) / 1000;
      mouse.x += (mouse.targetX - mouse.x) * 0.065;
      mouse.y += (mouse.targetY - mouse.y) * 0.065;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uniforms.u_resolution, canvas.width, canvas.height);
      gl.uniform2f(uniforms.u_mouse, mouse.x, mouse.y);
      gl.uniform1f(uniforms.u_time, elapsed);
      gl.uniform1f(uniforms.u_speed, settings.speed);
      gl.uniform1f(uniforms.u_scale, settings.scale);
      gl.uniform1f(uniforms.u_rotation, settings.rotation);
      gl.uniform1f(uniforms.u_flow, settings.flow);
      gl.uniform1f(uniforms.u_warp, settings.warp);
      gl.uniform1f(uniforms.u_variation, settings.variation);
      gl.uniform1f(uniforms.u_sheen, settings.sheen);
      gl.uniform1f(uniforms.u_glow, settings.glow);
      gl.uniform1f(uniforms.u_brightness, settings.brightness);
      gl.uniform1f(uniforms.u_grain, settings.grain);
      gl.uniform1f(uniforms.u_fade, settings.fade);
      gl.uniform1f(uniforms.u_opacity, settings.opacity);
      gl.uniform1f(uniforms.u_mouse_strength, settings.mouseStrength);
      gl.uniform1f(uniforms.u_intro, settings.intro && !reduceMotion ? Math.min(1, elapsed / 1.3) : 1);
      gl.uniform1f(uniforms.u_mouse_interaction, settings.mouseInteraction ? 1 : 0);
      gl.uniform1f(uniforms.u_light_mode, settings.lightMode ? 1 : 0);
      gl.uniform1f(uniforms.u_quality, settings.quality);
      gl.uniform3fv(uniforms.u_color, parseColor(settings.color));
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };

    const wake = () => {
      if (!frame && alive && visible) frame = requestAnimationFrame(draw);
    };
    const observer = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      if (visible) wake();
    });
    observer.observe(host);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    window.addEventListener("pointermove", updateMouse, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    resize();
    updateParallax();
    wake();

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(scrollFrame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", updateMouse);
      window.removeEventListener("scroll", onScroll);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`dark-veil-canvas ${className}`}
      aria-hidden="true"
    />
  );
}
