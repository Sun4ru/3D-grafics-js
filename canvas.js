
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

function line(stx, sty, endx, endy, color="white"){
    ctx.beginPath();
    ctx.moveTo(stx,sty);
    ctx.lineTo(endx,endy);
    ctx.strokeStyle = color
    ctx.stroke();
    ctx.closePath();
}

function drawPoint(x=0,y=0, color="white"){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 5, 5);
}

function drawPixel(x,y, size, color="white"){
    ctx.fillStyle = color;
    ctx.fillRect(x*size, y*size, size, size);
}

function drawPointObject(obj, color="white"){
    //the obj is an array
    drawPoint(obj[0],obj[1],color);
}

const a = canvas.clientWidth/canvas.clientHeight