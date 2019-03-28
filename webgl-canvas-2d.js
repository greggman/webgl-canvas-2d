(function() {
class MatrixStack {
  constructor() {
    this.reset();
  }
  reset() {
    this.stack = [];

    // since the stack is empty this will put an initial matrix in it
    this.restore();
  }
  // Pops the top of the stack restoring the previously saved matrix
  restore() {
    this.stack.pop();
    // Never let the stack be totally empty
    if (this.stack.length < 1) {
      this.stack[0] = m3.identity();
    }
  }

  // Pushes a copy of the current matrix on the stack
  save() {
    this.stack.push(this.getCurrentMatrix());
  }

  // Gets a copy of the current matrix (top of the stack)
  getCurrentMatrix() {
    return this.stack[this.stack.length - 1].slice();
  }

  // Lets us set the current matrix
  setCurrentMatrix(m) {
    this.stack[this.stack.length - 1] = m;
    return m;
  }

  // Translates the current matrix
  translate(x, y) {
    const m = this.getCurrentMatrix();
    this.setCurrentMatrix(m3.translate(m, x, y));
  }

  // Rotates the current matrix around Z
  rotate(angleInRadians) {
    const m = this.getCurrentMatrix();
    this.setCurrentMatrix(m3.rotate(m, -angleInRadians));
  }

  // Scales the current matrix
  scale(x, y) {
    const m = this.getCurrentMatrix();
    this.setCurrentMatrix(m3.scale(m, x, y));
  }
}

const ColorKeywords = { 'aliceblue': 0xF0F8FF, 'antiquewhite': 0xFAEBD7, 'aqua': 0x00FFFF, 'aquamarine': 0x7FFFD4, 'azure': 0xF0FFFF,
  'beige': 0xF5F5DC, 'bisque': 0xFFE4C4, 'black': 0x000000, 'blanchedalmond': 0xFFEBCD, 'blue': 0x0000FF, 'blueviolet': 0x8A2BE2,
  'brown': 0xA52A2A, 'burlywood': 0xDEB887, 'cadetblue': 0x5F9EA0, 'chartreuse': 0x7FFF00, 'chocolate': 0xD2691E, 'coral': 0xFF7F50,
  'cornflowerblue': 0x6495ED, 'cornsilk': 0xFFF8DC, 'crimson': 0xDC143C, 'cyan': 0x00FFFF, 'darkblue': 0x00008B, 'darkcyan': 0x008B8B,
  'darkgoldenrod': 0xB8860B, 'darkgray': 0xA9A9A9, 'darkgreen': 0x006400, 'darkgrey': 0xA9A9A9, 'darkkhaki': 0xBDB76B, 'darkmagenta': 0x8B008B,
  'darkolivegreen': 0x556B2F, 'darkorange': 0xFF8C00, 'darkorchid': 0x9932CC, 'darkred': 0x8B0000, 'darksalmon': 0xE9967A, 'darkseagreen': 0x8FBC8F,
  'darkslateblue': 0x483D8B, 'darkslategray': 0x2F4F4F, 'darkslategrey': 0x2F4F4F, 'darkturquoise': 0x00CED1, 'darkviolet': 0x9400D3,
  'deeppink': 0xFF1493, 'deepskyblue': 0x00BFFF, 'dimgray': 0x696969, 'dimgrey': 0x696969, 'dodgerblue': 0x1E90FF, 'firebrick': 0xB22222,
  'floralwhite': 0xFFFAF0, 'forestgreen': 0x228B22, 'fuchsia': 0xFF00FF, 'gainsboro': 0xDCDCDC, 'ghostwhite': 0xF8F8FF, 'gold': 0xFFD700,
  'goldenrod': 0xDAA520, 'gray': 0x808080, 'green': 0x008000, 'greenyellow': 0xADFF2F, 'grey': 0x808080, 'honeydew': 0xF0FFF0, 'hotpink': 0xFF69B4,
  'indianred': 0xCD5C5C, 'indigo': 0x4B0082, 'ivory': 0xFFFFF0, 'khaki': 0xF0E68C, 'lavender': 0xE6E6FA, 'lavenderblush': 0xFFF0F5, 'lawngreen': 0x7CFC00,
  'lemonchiffon': 0xFFFACD, 'lightblue': 0xADD8E6, 'lightcoral': 0xF08080, 'lightcyan': 0xE0FFFF, 'lightgoldenrodyellow': 0xFAFAD2, 'lightgray': 0xD3D3D3,
  'lightgreen': 0x90EE90, 'lightgrey': 0xD3D3D3, 'lightpink': 0xFFB6C1, 'lightsalmon': 0xFFA07A, 'lightseagreen': 0x20B2AA, 'lightskyblue': 0x87CEFA,
  'lightslategray': 0x778899, 'lightslategrey': 0x778899, 'lightsteelblue': 0xB0C4DE, 'lightyellow': 0xFFFFE0, 'lime': 0x00FF00, 'limegreen': 0x32CD32,
  'linen': 0xFAF0E6, 'magenta': 0xFF00FF, 'maroon': 0x800000, 'mediumaquamarine': 0x66CDAA, 'mediumblue': 0x0000CD, 'mediumorchid': 0xBA55D3,
  'mediumpurple': 0x9370DB, 'mediumseagreen': 0x3CB371, 'mediumslateblue': 0x7B68EE, 'mediumspringgreen': 0x00FA9A, 'mediumturquoise': 0x48D1CC,
  'mediumvioletred': 0xC71585, 'midnightblue': 0x191970, 'mintcream': 0xF5FFFA, 'mistyrose': 0xFFE4E1, 'moccasin': 0xFFE4B5, 'navajowhite': 0xFFDEAD,
  'navy': 0x000080, 'oldlace': 0xFDF5E6, 'olive': 0x808000, 'olivedrab': 0x6B8E23, 'orange': 0xFFA500, 'orangered': 0xFF4500, 'orchid': 0xDA70D6,
  'palegoldenrod': 0xEEE8AA, 'palegreen': 0x98FB98, 'paleturquoise': 0xAFEEEE, 'palevioletred': 0xDB7093, 'papayawhip': 0xFFEFD5, 'peachpuff': 0xFFDAB9,
  'peru': 0xCD853F, 'pink': 0xFFC0CB, 'plum': 0xDDA0DD, 'powderblue': 0xB0E0E6, 'purple': 0x800080, 'rebeccapurple': 0x663399, 'red': 0xFF0000, 'rosybrown': 0xBC8F8F,
  'royalblue': 0x4169E1, 'saddlebrown': 0x8B4513, 'salmon': 0xFA8072, 'sandybrown': 0xF4A460, 'seagreen': 0x2E8B57, 'seashell': 0xFFF5EE,
  'sienna': 0xA0522D, 'silver': 0xC0C0C0, 'skyblue': 0x87CEEB, 'slateblue': 0x6A5ACD, 'slategray': 0x708090, 'slategrey': 0x708090, 'snow': 0xFFFAFA,
  'springgreen': 0x00FF7F, 'steelblue': 0x4682B4, 'tan': 0xD2B48C, 'teal': 0x008080, 'thistle': 0xD8BFD8, 'tomato': 0xFF6347, 'turquoise': 0x40E0D0,
  'violet': 0xEE82EE, 'wheat': 0xF5DEB3, 'white': 0xFFFFFF, 'whitesmoke': 0xF5F5F5, 'yellow': 0xFFFF00, 'yellowgreen': 0x9ACD32 };


function fromHex(hex) {
  return [
    (hex >> 16 & 255) / 255,
    (hex >> 8 & 255) / 255,
    (hex & 255) / 255,
 ];
}

function hue2rgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
  return p;
}

function euclideanModulo(n, m) {
  return ((n % m) + m) % m;
}

function fromHSL(h, s, l) {
  h = euclideanModulo(h, 1);
  s = clamp(s, 0, 1);
  l = clamp(l, 0, 1);

  if (s === 0) {
      return [l, l, l]
  } else {
      var p = l <= 0.5 ? l * (1 + s) : l + s - (l * s);
      var q = (2 * l) - p;

      return [
        hue2rgb(q, p, h + 1 / 3),
        hue2rgb(q, p, h),
        hue2rgb(q, p, h - 1 / 3),
     ];
  }
}

function cssToColor(style) {

  function handleAlpha(string) {
    if (string === undefined) return 1;
    return parseFloat(string);
  }

  var m;

  if (m = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(style)) {

    // rgb / hsl

    var color;
    var name = m[1];
    var components = m[2];

    switch (name) {
      case 'rgb':
      case 'rgba':
        if (color = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {
          // rgb(255,0,0) rgba(255,0,0,0.5)
          return [
            Math.min(255, parseInt(color[1], 10)) / 255,
            Math.min(255, parseInt(color[2], 10)) / 255,
            Math.min(255, parseInt(color[3], 10)) / 255,
            handleAlpha(color[5]),
          ];
        }
        if (color = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {
          // rgb(100%,0%,0%) rgba(100%,0%,0%,0.5)
          return [
            Math.min(100, parseInt(color[1], 10)) / 100,
            Math.min(100, parseInt(color[2], 10)) / 100,
            Math.min(100, parseInt(color[3], 10)) / 100,
            handleAlpha(color[5]),
          ];
        }
        break;
      case 'hsl':
      case 'hsla':
        if (color = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {
          // hsl(120,50%,50%) hsla(120,50%,50%,0.5)
          var h = parseFloat(color[1]) / 360;
          var s = parseInt(color[2], 10) / 100;
          var l = parseInt(color[3], 10) / 100;

          return [...fromHSL(h, s, l), handleAlpha(color[5])];
        }
        break;
    }
  } else if (m = /^\#([A-Fa-f0-9]+)$/.exec(style)) {
    // hex color
    const hex = m[1];
    const size = hex.length;

    if (size === 3) {
      // #ff0
      return [
        parseInt(hex.charAt(0) + hex.charAt(0), 16) / 255,
        parseInt(hex.charAt(1) + hex.charAt(1), 16) / 255,
        parseInt(hex.charAt(2) + hex.charAt(2), 16) / 255,
        1,
      ];
    } else if (size === 6) {
      // #ff0000
      return [
        parseInt(hex.charAt(0) + hex.charAt(1), 16) / 255,
        parseInt(hex.charAt(2) + hex.charAt(3), 16) / 255,
        parseInt(hex.charAt(4) + hex.charAt(5), 16) / 255,
        1,
      ];
    }
  }

  if (style && style.length > 0) {
    // color keywords
    const hex = ColorKeywords[style];

    if (hex !== undefined) {
      return [...fromInt(hex), 1];
    } else {
      // unknown color
      console.warn('Unknown color ' + style);
    }
  }
  return [1, 0, 1, 1];
}

class WebGLCanvas2DRenderingContext {
  constructor(canvas) {
    this.canvas = canvas;
    canvas.resize = this.resize.bind(this);
    /*
    const self = this;

    Object.defineProperties(canvas, {
      get width() {
        return this.gl.width;
      }
      set width(v) {
        this.gl.width = v;
        this.reset();
      }
      get height() {
        return this.gl.width;
      }
      set height(v) {
        this.gl.height = v;
        this.reset();
      }
    });
    */

    const gl = canvas.getContext('webgl', {preserveDrawingBuffer: true});
    this.gl = gl;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const vs = `
attribute vec2 position;

uniform mat3 u_matrix;
uniform mat3 u_textureMatrix;

varying vec2 v_texcoord;

void main() {
  gl_Position = vec4((u_matrix * vec3(position, 1)).xy, 0, 1);

  // using position for texcoord since we know position is a unit square
  v_texcoord = (u_textureMatrix * vec3(position, 1)).xy;
}
`;
    const fs = `
precision mediump float;

varying vec2 v_texcoord;

uniform sampler2D texture;
uniform vec4 color;

void main() {
  gl_FragColor = texture2D(texture, v_texcoord) * color;
  gl_FragColor.rgb *= gl_FragColor.a;
}
`;
    this.programInfo = twgl.createProgramInfo(gl, [vs, fs]);
    this.bufferInfo = twgl.createBufferInfoFromArrays(gl, {
      position: {
        numComponents: 2,
        data: [
          0, 0,
          0, 1,
          1, 0,
          1, 0,
          0, 1,
          1, 1,
       ],
      },
    });

    twgl.setBuffersAndAttributes(gl, this.programInfo, this.bufferInfo);

    this.matrixStack = new MatrixStack();
    this.translate = this.matrixStack.translate.bind(this.matrixStack);
    this.rotate = this.matrixStack.rotate.bind(this.matrixStack);
    this.scale = this.matrixStack.scale.bind(this.matrixStack);
    this.texturesByImage = new Map();
    this.whiteTexture = {
      width: 1,
      height: 1,
    }

    this.texturesByImage.set(this.whiteTexture, this.createColorTexture255([255, 255, 255, 255]));
  }
  reset() {
    const {gl} = this;
    this.matrixStack.reset();
    this.state = {
      fillStyle = 'black',
      fillColor = [0, 0, 0, 1],
      globalAlpha = 1,
    };
    this.stack = [];
  }
  save() {
    this.matrixStack.save();
    const newState = Object.assign({}, this.state);
    this.stack.push(this.state)
    this.state = newState;
  }
  restore() {
    this.matrixStack.restore();
    this.state = this.stack.pop();
  }
  resize(width, height) {
    const {canvas, gl} = this;
    canvas.width = width;
    canvas.height = height;
    this.updateSize();
  }
  updateSize() {
    const {gl} = this;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  }
  setTransform(m1, m2, m3, m4, m5, m6) {
    this.matrixStack.setCurrentMatrix([
      m1, m2, 0,
      m3, m4, 0,
      m5, m6, 1,
   ]);
  }
  get fillStyle() {
    return this.state._fillStyle;
  }
  set fillStyle(v) {
    this.state._fillStyle = v;
    this.state._fillColor = cssToColor(v);
  }
  get globalAlpha() {
    return this.state._globalAlpha;
  }
  set globalAlpha(v) {
    this.state._globalAlpha = v;
  }
  clearRect(x, y, width, height) {
    const {gl} = this;
    gl.disable(gl.BLEND);
    this.fillRectImpl(x, y, width, height, [0, 0, 0, 0]);
    gl.enable(gl.BLEND);
  }
  fillRect(x, y, width, height) {
    this.fillRectImpl(x, y, width, height, this.state._fillColor);
  }
  fillRectImpl(x, y, width, height, color) {
    this.drawImageImpl(color, this.whiteTexture, x, y, width, height)
  }
  createTexture() {
    const {gl} = this;
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return tex;
  }
  createColorTexture255(color) {
    const {gl} = this;
    const tex = this.createTexture();
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(color));
    return tex;
  }
  drawImage(img, srcX, srcY, srcW, srcH, dstX, dstY, dstWidth, dstHeight) {
    this.drawImageImpl([1, 1, 1, 1], img, srcX, srcY, srcW, srcH, dstX, dstY, dstWidth, dstHeight);
  }
  drawImageImpl(color, img, srcX, srcY, srcWidth, srcHeight, dstX, dstY, dstWidth, dstHeight) {
    const {gl, programInfo, bufferInfo, matrixStack} = this;

    let tex = this.texturesByImage.get(img);
    if (!tex) {
      tex = this.createTexture();
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      this.texturesByImage.set(img, tex);
    }

    if (dstX === undefined) {
      dstX = srcX;
    }
    if (dstY === undefined) {
      dstY = srcY;
    }
    if (srcWidth === undefined) {
      srcWidth = img.width;
    }
    if (srcHeight === undefined) {
      srcHeight = img.height;
    }
    if (dstWidth === undefined) {
      dstWidth = srcWidth;
    }
    if (dstHeight === undefined) {
      dstHeight = srcHeight;
    }

    // Tell WebGL to use our shader program pair
    gl.useProgram(programInfo.program);

    // this matirx will convert from pixels to clip space
    let matrix = m3.projection(gl.canvas.width, gl.canvas.height);

    // this matrix moves the origin to the one represented by
    // the current matrix stack.
    matrix = m3.multiply(matrix, matrixStack.getCurrentMatrix());

    // this matrix will translate our quad to dstX, dstY
    matrix = m3.translate(matrix, dstX, dstY);

    // this matrix will scale our 1 unit quad
    // from 1 unit to texWidth, texHeight units
    matrix = m3.scale(matrix, dstWidth, dstHeight);

    // Because texture coordinates go from 0 to 1
    // and because our texture coordinates are already a unit quad
    // we can select an area of the texture by scaling the unit quad
    // down
    let texMatrix = m3.translation(srcX / img.width, srcY / img.height);
    texMatrix = m3.scale(texMatrix, srcWidth / img.width, srcHeight / img.height);

    twgl.setUniforms(programInfo, {
      u_matrix: matrix,
      u_textureMatrix: texMatrix,
      color: [color[0], color[1], color[2], color[3] * this.state._globalAlpha],
      texture: tex,
    });
    twgl.drawBufferInfo(gl, bufferInfo);
  }
}

window.WebGLCanvas2DRenderingContext = WebGLCanvas2DRenderingContext;

}());