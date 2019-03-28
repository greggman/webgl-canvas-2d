function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.onerror = reject;
    img.src = url;
  });
}

function resizeCanvasToDisplaySize(canvas) {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (width === canvas.width && height === canvas.height) {
    return false;
  }

  if (canvas.resize) {
    canvas.resize(width, height);
  } else {
    canvas.width = width;
    canvas.height = height;
  }
  return true;
}


async function main() {
  const img = await loadImage('f-texture.png');
  const ctx = document.querySelector('canvas').getContext('2d');

  function render(time) {
    time *= 0.001;

    resizeCanvasToDisplaySize(ctx.canvas);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.save();
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
    ctx.rotate(time);

    ctx.save();
    {
      ctx.translate(img.width / -2, img.height / -2);

      ctx.drawImage(img, 0, 0);
    }
    ctx.restore();

    ctx.save();
    {
      // We're at the center of the center image so go to the top/left corner
      ctx.translate(img.width / -2, img.height / -2);
      ctx.rotate(Math.sin(time * 2.2));
      ctx.scale(0.2, 0.2);
      // Now we want the bottom/right corner of the image we're about to draw
      ctx.translate(-img.width, -img.height);

      ctx.drawImage(img, 0, 0);
    }
    ctx.restore();

    ctx.save();
    {
      // We're at the center of the center image so go to the top/right corner
      ctx.translate(img.width / 2, img.height / -2);
      ctx.rotate(Math.sin(time * 2.3));
      ctx.scale(0.2, 0.2);
      // Now we want the bottom/right corner of the image we're about to draw
      ctx.translate(0, -img.height);

      ctx.drawImage(img, 0, 0);
    }
    ctx.restore();

    ctx.save();
    {
      // We're at the center of the center image so go to the bottom/left corner
      ctx.translate(img.width / -2, img.height / 2);
      ctx.rotate(Math.sin(time * 2.4));
      ctx.scale(0.2, 0.2);
      // Now we want the top/right corner of the image we're about to draw
      ctx.translate(-img.width, 0);

      ctx.drawImage(img, 0, 0);
    }
    ctx.restore();

    ctx.save();
    {
      // We're at the center of the center image so go to the bottom/right corner
      ctx.translate(img.width / 2, img.height / 2);
      ctx.rotate(Math.sin(time * 2.5));
      ctx.scale(0.2, 0.2);
      // Now we want the top/left corner of the image we're about to draw
      ctx.translate(0, 0);  // 0,0 means this line is not really doing anything

      ctx.drawImage(img, 0, 0);
    }
    ctx.restore();


    ctx.restore();

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
main();

