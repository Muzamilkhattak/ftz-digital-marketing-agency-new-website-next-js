'use client';

import { useEffect, useRef } from 'react';

export default function FluidCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const config = {
      TEXTURE_DOWNSAMPLE: 1,
      DENSITY_DISSIPATION: 0.98,
      VELOCITY_DISSIPATION: 0.99,
      PRESSURE_DISSIPATION: 0.8,
      PRESSURE_ITERATIONS: 25,
      CURL: 28,
      SPLAT_RADIUS: 0.004,
    };

    interface Pointer {
      id: number;
      x: number;
      y: number;
      dx: number;
      dy: number;
      down: boolean;
      moved: boolean;
      color: number[];
    }

    const pointers: Pointer[] = [];
    const splatStack: number[] = [];

    function pointerPrototype(): Pointer {
      return {
        id: -1,
        x: 0,
        y: 0,
        dx: 0,
        dy: 0,
        down: false,
        moved: false,
        color: [0.18, 0.5, 0.93], // Electric blue RGB normalized
      };
    }

    pointers.push(pointerPrototype());

    // Get WebGL context
    const gl = canvas.getContext('webgl2', { alpha: false, depth: false, stencil: false, antialias: false });
    if (!gl) {
      console.error('WebGL2 not supported');
      return;
    }

    const ext = {
      formatRGBA: { internalFormat: gl.RGBA16F, format: gl.RGBA },
      formatRG: { internalFormat: gl.RG16F, format: gl.RG },
      formatR: { internalFormat: gl.R16F, format: gl.RED },
      halfFloatTexType: gl.HALF_FLOAT,
      supportLinearFiltering: gl.getExtension('OES_texture_float_linear'),
    };

    gl.getExtension('EXT_color_buffer_float');
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Shader sources
    const baseVertexShader = `#version 300 es
      precision highp float;
      in vec2 aPosition;
      out vec2 vUv;
      out vec2 vL;
      out vec2 vR;
      out vec2 vT;
      out vec2 vB;
      uniform vec2 texelSize;
      void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const displayShader = `#version 300 es
      precision highp float;
      in vec2 vUv;
      out vec4 fragColor;
      uniform sampler2D uTexture;
      void main () {
        fragColor = texture(uTexture, vUv);
      }
    `;

    const splatShader = `#version 300 es
      precision highp float;
      in vec2 vUv;
      out vec4 fragColor;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;
      void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture(uTexture, vUv).xyz;
        fragColor = vec4(base + splat, 1.0);
      }
    `;

    const advectionShader = `#version 300 es
      precision highp float;
      in vec2 vUv;
      out vec4 fragColor;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform float dt;
      uniform float dissipation;
      void main () {
        vec2 coord = vUv - dt * texture(uVelocity, vUv).xy * texelSize;
        fragColor = dissipation * texture(uSource, coord);
        fragColor.a = 1.0;
      }
    `;

    const divergenceShader = `#version 300 es
      precision highp float;
      in vec2 vUv;
      in vec2 vL;
      in vec2 vR;
      in vec2 vT;
      in vec2 vB;
      out vec4 fragColor;
      uniform sampler2D uVelocity;
      void main () {
        float L = texture(uVelocity, vL).x;
        float R = texture(uVelocity, vR).x;
        float T = texture(uVelocity, vT).y;
        float B = texture(uVelocity, vB).y;
        float div = 0.5 * (R - L + T - B);
        fragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `;

    const curlShader = `#version 300 es
      precision highp float;
      in vec2 vUv;
      in vec2 vL;
      in vec2 vR;
      in vec2 vT;
      in vec2 vB;
      out vec4 fragColor;
      uniform sampler2D uVelocity;
      void main () {
        float L = texture(uVelocity, vL).y;
        float R = texture(uVelocity, vR).y;
        float T = texture(uVelocity, vT).x;
        float B = texture(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        fragColor = vec4(vorticity, 0.0, 0.0, 1.0);
      }
    `;

    const vorticityShader = `#version 300 es
      precision highp float;
      in vec2 vUv;
      in vec2 vT;
      in vec2 vB;
      out vec4 fragColor;
      uniform sampler2D uVelocity;
      uniform sampler2D uCurl;
      uniform float curl;
      uniform float dt;
      void main () {
        float T = texture(uCurl, vT).x;
        float B = texture(uCurl, vB).x;
        float C = texture(uCurl, vUv).x;
        vec2 force = vec2(abs(T) - abs(B), 0.0);
        force *= 1.0 / length(force + 0.00001) * curl * C;
        vec2 vel = texture(uVelocity, vUv).xy;
        fragColor = vec4(vel + force * dt, 0.0, 1.0);
      }
    `;

    const pressureShader = `#version 300 es
      precision highp float;
      in vec2 vUv;
      in vec2 vL;
      in vec2 vR;
      in vec2 vT;
      in vec2 vB;
      out vec4 fragColor;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;
      void main () {
        float L = texture(uPressure, vL).x;
        float R = texture(uPressure, vR).x;
        float T = texture(uPressure, vT).x;
        float B = texture(uPressure, vB).x;
        float divergence = texture(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        fragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
    `;

    const gradientSubtractShader = `#version 300 es
      precision highp float;
      in vec2 vUv;
      in vec2 vL;
      in vec2 vR;
      in vec2 vT;
      in vec2 vB;
      out vec4 fragColor;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;
      void main () {
        float L = texture(uPressure, vL).x;
        float R = texture(uPressure, vR).x;
        float T = texture(uPressure, vT).x;
        float B = texture(uPressure, vB).x;
        vec2 velocity = texture(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        fragColor = vec4(velocity, 0.0, 1.0);
      }
    `;

    const clearShader = `#version 300 es
      precision highp float;
      in vec2 vUv;
      out vec4 fragColor;
      uniform sampler2D uTexture;
      uniform float value;
      void main () {
        fragColor = value * texture(uTexture, vUv);
      }
    `;

    // Compile shader
    function compileShader(type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    }

    // Create program
    class GLProgram {
      program: WebGLProgram;
      uniforms: Record<string, WebGLUniformLocation | null> = {};

      constructor(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        this.program = gl.createProgram()!;
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);

        const uniformCount = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
          const uniformName = gl.getActiveUniform(this.program, i)!.name;
          this.uniforms[uniformName] = gl.getUniformLocation(this.program, uniformName);
        }
      }

      bind() {
        gl.useProgram(this.program);
      }
    }

    const baseVertex = compileShader(gl.VERTEX_SHADER, baseVertexShader)!;
    const displayProgram = new GLProgram(baseVertex, compileShader(gl.FRAGMENT_SHADER, displayShader)!);
    const splatProgram = new GLProgram(baseVertex, compileShader(gl.FRAGMENT_SHADER, splatShader)!);
    const advectionProgram = new GLProgram(baseVertex, compileShader(gl.FRAGMENT_SHADER, advectionShader)!);
    const divergenceProgram = new GLProgram(baseVertex, compileShader(gl.FRAGMENT_SHADER, divergenceShader)!);
    const curlProgram = new GLProgram(baseVertex, compileShader(gl.FRAGMENT_SHADER, curlShader)!);
    const vorticityProgram = new GLProgram(baseVertex, compileShader(gl.FRAGMENT_SHADER, vorticityShader)!);
    const pressureProgram = new GLProgram(baseVertex, compileShader(gl.FRAGMENT_SHADER, pressureShader)!);
    const gradientSubtractProgram = new GLProgram(baseVertex, compileShader(gl.FRAGMENT_SHADER, gradientSubtractShader)!);
    const clearProgram = new GLProgram(baseVertex, compileShader(gl.FRAGMENT_SHADER, clearShader)!);

    // Create FBOs
    let textureWidth: number, textureHeight: number;
    let density: any, velocity: any, divergence: any, curl: any, pressure: any;

    function createFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number) {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);

      return { texture, fbo, width: w, height: h };
    }

    function createDoubleFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number) {
      let fbo1 = createFBO(w, h, internalFormat, format, type, param);
      let fbo2 = createFBO(w, h, internalFormat, format, type, param);

      return {
        get read() {
          return fbo1;
        },
        get write() {
          return fbo2;
        },
        swap() {
          const temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        },
      };
    }

    function initFramebuffers() {
      textureWidth = gl.drawingBufferWidth >> config.TEXTURE_DOWNSAMPLE;
      textureHeight = gl.drawingBufferHeight >> config.TEXTURE_DOWNSAMPLE;

      const texType = ext.halfFloatTexType;
      const rgba = ext.formatRGBA;
      const rg = ext.formatRG;
      const r = ext.formatR;
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

      density = createDoubleFBO(textureWidth, textureHeight, rgba.internalFormat, rgba.format, texType, filtering);
      velocity = createDoubleFBO(textureWidth, textureHeight, rg.internalFormat, rg.format, texType, filtering);
      divergence = createFBO(textureWidth, textureHeight, r.internalFormat, r.format, texType, gl.NEAREST);
      curl = createFBO(textureWidth, textureHeight, r.internalFormat, r.format, texType, gl.NEAREST);
      pressure = createDoubleFBO(textureWidth, textureHeight, r.internalFormat, r.format, texType, gl.NEAREST);
    }

    initFramebuffers();

    // Blit
    const blit = (() => {
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);

      return (destination: WebGLFramebuffer | null) => {
        gl.bindFramebuffer(gl.FRAMEBUFFER, destination);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      };
    })();

    function splat(x: number, y: number, dx: number, dy: number, color: number[]) {
      splatProgram.bind();
      gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.texture);
      gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
      gl.uniform2f(splatProgram.uniforms.point, x / canvas.width, 1.0 - y / canvas.height);
      gl.uniform3f(splatProgram.uniforms.color, dx, -dy, 1.0);
      gl.uniform1f(splatProgram.uniforms.radius, config.SPLAT_RADIUS);
      blit(velocity.write.fbo);
      velocity.swap();

      gl.uniform1i(splatProgram.uniforms.uTarget, density.read.texture);
      gl.uniform3f(splatProgram.uniforms.color, color[0] * 0.3, color[1] * 0.3, color[2] * 0.3);
      blit(density.write.fbo);
      density.swap();
    }

    function multipleSplats(amount: number) {
      for (let i = 0; i < amount; i++) {
        const color = [0.18, 0.5, 0.93]; // Electric blue
        const x = canvas.width * Math.random();
        const y = canvas.height * Math.random();
        const dx = 1000 * (Math.random() - 0.5);
        const dy = 1000 * (Math.random() - 0.5);
        splat(x, y, dx, dy, color);
      }
    }

    function resizeCanvas() {
      if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        initFramebuffers();
      }
    }

    let lastTime = Date.now();
    multipleSplats(parseInt(String(Math.random() * 20)) + 5);

    function update() {
      resizeCanvas();

      const dt = Math.min((Date.now() - lastTime) / 1000, 0.016);
      lastTime = Date.now();

      gl.viewport(0, 0, textureWidth, textureHeight);

      if (splatStack.length > 0) multipleSplats(splatStack.pop()!);

      advectionProgram.bind();
      gl.uniform2f(advectionProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.texture);
      gl.uniform1i(advectionProgram.uniforms.uSource, velocity.read.texture);
      gl.uniform1f(advectionProgram.uniforms.dt, dt);
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
      blit(velocity.write.fbo);
      velocity.swap();

      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.texture);
      gl.uniform1i(advectionProgram.uniforms.uSource, density.read.texture);
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
      blit(density.write.fbo);
      density.swap();

      for (let i = 0; i < pointers.length; i++) {
        const pointer = pointers[i];
        if (pointer.moved) {
          splat(pointer.x, pointer.y, pointer.dx, pointer.dy, pointer.color);
          pointer.moved = false;
        }
      }

      curlProgram.bind();
      gl.uniform2f(curlProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
      gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.texture);
      blit(curl.fbo);

      vorticityProgram.bind();
      gl.uniform2f(vorticityProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
      gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.texture);
      gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.texture);
      gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
      gl.uniform1f(vorticityProgram.uniforms.dt, dt);
      blit(velocity.write.fbo);
      velocity.swap();

      divergenceProgram.bind();
      gl.uniform2f(divergenceProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
      gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.texture);
      blit(divergence.fbo);

      clearProgram.bind();
      gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.texture);
      gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE_DISSIPATION);
      blit(pressure.write.fbo);
      pressure.swap();

      pressureProgram.bind();
      gl.uniform2f(pressureProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
      gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.texture);
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.texture);
        blit(pressure.write.fbo);
        pressure.swap();
      }

      gradientSubtractProgram.bind();
      gl.uniform2f(gradientSubtractProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
      gl.uniform1i(gradientSubtractProgram.uniforms.uPressure, pressure.read.texture);
      gl.uniform1i(gradientSubtractProgram.uniforms.uVelocity, velocity.read.texture);
      blit(velocity.write.fbo);
      velocity.swap();

      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      displayProgram.bind();
      gl.uniform1i(displayProgram.uniforms.uTexture, density.read.texture);
      blit(null);

      requestAnimationFrame(update);
    }

    update();

    // Event listeners
    const handleMouseMove = (e: MouseEvent) => {
      pointers[0].moved = pointers[0].down;
      pointers[0].dx = (e.offsetX - pointers[0].x) * 10.0;
      pointers[0].dy = (e.offsetY - pointers[0].y) * 10.0;
      pointers[0].x = e.offsetX;
      pointers[0].y = e.offsetY;
    };

    const handleMouseDown = () => {
      pointers[0].down = true;
      pointers[0].color = [0.18, 0.5, 0.93]; // Electric blue
    };

    const handleMouseLeave = () => {
      pointers[0].down = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[9999]"
      style={{
        mixBlendMode: 'screen',
      }}
    />
  );
}
