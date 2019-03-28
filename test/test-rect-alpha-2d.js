const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

ctx.globalAlpha = 0.5;

ctx.fillStyle = 'blue';
ctx.fillRect(10, 10, 100, 100);

ctx.fillStyle = 'red';
ctx.fillRect(50, 50, 100, 100);
