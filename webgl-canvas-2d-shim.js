HTMLCanvasElement.prototype.getContext = function(origFn) {

  return function(type, attribs) {
    if (type === '2d') {
      return new WebGLCanvas2DRenderingContext(this);
    }
    return origFn.call(this, type, attribs);
  };

}(HTMLCanvasElement.prototype.getContext);
