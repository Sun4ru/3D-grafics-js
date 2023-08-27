
const near = 1;
const far = 1000;
const angle = 90;

const ligthRay = new Vec4(0,0,1,1);

let r = near * Math.tan(angle/2)*a;
let t = near * Math.tan(angle/2);

var camPosx = 0;
var camPosy = 0;
var camPosz = 5;

var p1 = new Vec4(-2,1,10,1, "blue");
let p2 = new Vec4(-2,2,10,1, "red");
let p3 = new Vec4(-1,1,10,1, "green");
let p4 = new Vec4(-1,2,10,1);

let p5 = new Vec4(-2,1,11,1);
let p6 = new Vec4(-2,2,11,1); 
let p7 = new Vec4(-1,1,11,1);
let p8 = new Vec4(-1,2,11,1);

let center = new Vec4(-1.5, 1.5, 10.5, 1);

let mat4x4 = [
    [1/r, 0, 0, -camPosx/r],
    [0, 1/t, 0, -camPosy/t],
    [0, 0, far/(far-near), (-far*camPosz + far*near)/(far-near)],
    [0, 0, 1, -camPosz],
];


function matxVec(mat, vec){

    let x = mat[0][0] * vec.x + mat[0][1] * vec.y + mat[0][2] * vec.z + mat[0][3] * vec.w;
    let y = mat[1][0] * vec.x + mat[1][1] * vec.y + mat[1][2] * vec.z + mat[1][3] * vec.w;
    let z = mat[2][0] * vec.x + mat[2][1] * vec.y + mat[2][2] * vec.z + mat[2][3] * vec.w;
    let w = mat[3][0] * vec.x + mat[3][1] * vec.y + mat[3][2] * vec.z + mat[3][3] * vec.w;  

    return new Vec4(x,y,z,w);
}

function update(){

    ctx.clearRect(0,0, 1000, 800);
    let cube1 = new Cube(center, 0.5, 10);
    cube1.show();
    /*
    //Front
    tri1 = new Triangle(p1,p3,p2);
    tri2 = new Triangle(p3,p4,p2);
    tri1.fillTriangle();
    tri2.fillTriangle();
    //tri1.drawTriangle();
    //tri2.drawTriangle();
    //Left
    tri3 = new Triangle(p1,p2,p5);
    tri4 = new Triangle(p5,p2,p6);
    tri3.fillTriangle();
    tri4.fillTriangle();
    //Right
    tri5 = new Triangle(p3,p7,p4);
    tri6 = new Triangle(p7,p8,p4);
    tri5.fillTriangle();
    tri6.fillTriangle();
    //Back
    tri7 = new Triangle(p7,p5,p6);
    tri8 = new Triangle(p7,p6,p8);
    tri7.fillTriangle();
    tri8.fillTriangle();
    //Top
    tri9 = new Triangle(p5,p7,p1);
    tri10 = new Triangle(p7,p3,p1);
    tri9.fillTriangle();
    tri10.fillTriangle();
    //Bottom
    tri11 = new Triangle(p2,p4,p8);
    tri12 = new Triangle(p2,p8,p6);
    tri11.fillTriangle();
    tri12.fillTriangle();
    //*/

    //setTimeout(update,500)
    
}   
update();

function showDebugLines(){
    tri1.drawTriangle();
    tri2.drawTriangle();
    tri3.drawTriangle();
    tri4.drawTriangle();
    tri5.drawTriangle();
    tri6.drawTriangle();
    tri7.drawTriangle();
    tri8.drawTriangle();
    tri9.drawTriangle();
    tri10.drawTriangle();
    tri11.drawTriangle();
    tri12.drawTriangle();
}


var move = 0; 

function moveUp(){

    p1.y --;
    p2.y --;
    p3.y --;
    p4.y --;
    p5.y --;
    p6.y --;
    p7.y --;
    p8.y --;    
    
    if (move < 5){
        setTimeout(moveUp, 500)
        move++
    }
}

//moveUp();






