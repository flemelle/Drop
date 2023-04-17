var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var introduction = document.querySelector('#intro');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let tab = [];

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
class Point{
    constructor(coordonate, size, color) {
        this.coordonate = coordonate;
        this.size = size;
        this.color = color;
    }
}
class Vector{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
}
async function DrawPoint(coordonate, size, color) {
    ctx.beginPath();
    ctx.arc(coordonate.x, coordonate.y, size, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(" + color[0] + "," + color[1]+ "," + color[2] + "," + color[3] + ")";
    ctx.fill();
}
function RandomColor() {
    let RGBA = [];
    for (let i = 0; i < 3; i++) {
        RGBA[i] = Math.round(Math.random() * 255);
    }
    RGBA[3] = 1;
    //console.log("RGBA = " + RGBA);
    return RGBA;
}
function SumVector(u, v) {
    let sum = new Vector((u.x + v.x), (u.y + v.y ));
    /* sum.x = u.x + v.x;
    sum.y = u.y + v.y; */
    return sum;
}
function ScalarVector(u, scalar) {
    u.x = u.x * scalar;
    u.y = u.y * scalar;
    return u; 
}
async function Burp(coordonate) {
    for (var i = 0; i < 5; i++){
        let speed = new Vector();
        let signe = 0;
        let position = coordonate;
        signe = RandomSign();
        speed.x = signe.x * (Math.random() * 15);
        speed.y = signe.y * (Math.random() * 15);
        console.log(speed.x, speed.y);
        Drop(position, speed);
    }
}
function RandomSign() {
    let signe = new Vector;
    let directionOne = Boolean(Math.round(Math.random()));
    let directionTwo = Boolean(Math.round(Math.random()));
    //for (let i = 0; i < 2; i++){
    if (directionOne) {
        signe.x = 1;
    }
    else if (!directionOne) {
        signe.x = -1;
    }
    if (directionTwo) {
        signe.y = 1;
    }
    else if (!directionTwo) {
        signe.y = -1;
    }
    return signe;
}
async function Click(coordonate) {
    let color = RandomColor();
    let size = 0;
    for (let i = 0; i < 44; i++){
        if ( i < 22 ) {
            DrawPoint(coordonate, size, color);
            size++;
        }
        else {
            DrawPoint(coordonate, size, color);
            size--;
        }
        await sleep(1);
    }
}
async function Drop(coordonate, speed) {
    //console.log("Drop is running");
    let position = coordonate;
    let velocity = new Vector(-speed.x, -speed.y-7);
    let gravity = new Vector(0, 2.5);
    let dt = 1;
    let color = RandomColor();
    for (let i = 0; i < 100; i = i + dt) {
        DrawPoint(position, 20, color);
        position.x = position.x + (velocity.x * dt);
        position.y = position.y + (velocity.y * dt);
        velocity.x = velocity.x + (gravity.x * dt);
        velocity.y = velocity.y + (gravity.y * dt);
        color[3] = color[3] - 0.007;
        await sleep(30);
    }    
}
async function ClearCanvas() {
    while(true){
        void ctx.clearRect(0, 0, canvas.width, canvas.height);
        await sleep(50);
    }
}
canvas.addEventListener('mousemove', async function (e) {
    //console.log("Mouse x,y position is : " + e.clientX, e.clientY);
    //console.log("Mouse x,y progression is : " + e.movementX, e.movementY);
    coordonate = new Vector(e.clientX, e.clientY);
    speed = new Vector(e.movementX, e.movementY);
    DrawPoint(coordonate, 20, RandomColor());
    Drop(coordonate, speed);
    await sleep(1);
})

canvas.addEventListener('click', function (e) {
    let position = new Vector(e.clientX, e.clientY);
    let position2 = new Vector(e.clientX, e.clientY);
    Click(position2);
    //Burp(position);
})

async function draw(tab){
    tab.forEach(element => {
    });
}
introduction.addEventListener('click', function () {
    introduction.classList.toggle('hide');
})
ClearCanvas();
