# WebGL-Canvas-2D

a minimal implementation of the canvas 2D API through WebGL.

This is not intended to actually work. It's just something for fun

The only API calls supported are

```
clearRect
fillRect
drawImage
filStyle
globalAlpha
save
restore
translate
rotate
scale
setTransform
```

For `drawImage` only `Image` is supported and the image must already be loaded
and its `src` must not change.

To use include these scripts

```
<script src="3rdparty/twgl-full.min.js"></script>
<script src="3rdparty/m3.js"></script>
<script src="webgl-canvas-2d.js"></script>
```

Then you can create a `WebGLCanvas2DRenderingContext` with

```
const ctx = new WebGLCanvas2DRenderingContext(someCanvas);
```

Note that it does not handle canvas resize automatically. To resize you have 2 options.

(a) call `canvas.resize`

Example

```
if (canvas.resize) {
  canvas.resize(newWidth, newHeight);
} else {
  canvas.width = newWidth;
  canvas.height = newHeight;
```

(b) call `ctx.updateSize`

```
canvas.width = newWidth;
canvas.height = newHeight;
ctx.updateSize();
```

You can also use the shim which makes it create `WebGLCanvas2DRenderingContext`s automatically.
Of course that means you can't create a normal 2D context, only this limited context.

```
<script src="../webgl-canvas-2d-shim.js"></script>
const ctx = someCanvas.getContext('2d');   // this is a WebGLCanvas2DRenderingContext
```


