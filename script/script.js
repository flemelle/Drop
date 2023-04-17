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
    constructor() {
        this.position = new Vector;
        this.size = 20;
        this.color = randomColor();
        this.count = 0;
        this.velocity = new Vector;
        this.speed = new Vector;
    }
}
class Vector{
    constructor() {
        this.x;
        this.y;
    }
}

introduction.addEventListener('click', function (e) {
    introduction.classList.toggle('hide');
    let point = new Point;
    point.position.x = e.clientX;
    point.position.y = e.clientY;
    setInterval(animation, 50, tab);
})
canvas.addEventListener('mousemove', function (e) {
    let point = new Point;
    point.position.x = e.clientX;
    point.position.y = e.clientY;
    point.speed.x = e.movementX;
    point.speed.y = e.movementY;
    point.velocity.x = -point.speed.x;
    point.velocity.y = -point.speed.y - 7;
    tab.push(point);
    //console.log(tab);
})

canvas.addEventListener('click', function (e) {
    let bull = new Point;
    bull.size = 0;
    bull.position.x = Number(e.clientX);
    bull.position.y = e.clientY;
    bull.velocity.x = -bull.speed.x;
    bull.velocity.y = -bull.speed.y - 7;
    //console.log(bull);
    /* for (var i = 0; i < 40; i++){
        setTimeout(click, 50, bull);
    } */
    //burp(bull, tab);
})

function randomColor() {
    let RGBA = [];
    for (let i = 0; i < 3; i++) {
        RGBA[i] = Math.round(Math.random() * 255);
    }
    RGBA[3] = 1;
    //console.log("RGBA = " + RGBA);
    return RGBA;
}
function sumVector(u, v) {
    let sum = new Vector;
    sum.x = u.x + v.x;
    sum.y = u.y + v.y;
    return sum;
}
function scalarVector(u, scalar) {
    u.x = u.x * scalar;
    u.y = u.y * scalar;
    return u; 
}
function burp(point, tab) {
    for (var i = 0; i < 5; i++){
        let signe = randomSign();
        point.speed.x = signe.x * (Math.random() * 15); 
        point.speed.y = signe.y * (Math.random() * 15);
        //console.log(point);
        tab.push(point);
    }
}
function randomSign() {
    let signe = new Vector;
    let directionOne = Boolean(Math.round(Math.random()));
    let directionTwo = Boolean(Math.round(Math.random()));
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
function click(point) {
    if ( point.count < 22 ) {
        drawPoint(point);
        point.size++;
        point.count++;
    }
    else {
        drawPoint(point);
        point.size--;
        point.count++;
    }
    
}
function drop(point) {
    let gravity = new Vector;
    gravity.x = 0;
    gravity.y = 2.7;
    let dt = 1;
    point.position.x = point.position.x + (point.velocity.x * dt);
    point.position.y = point.position.y + (point.velocity.y * dt);
    point.velocity.x = point.velocity.x + (gravity.x * dt);
    point.velocity.y = point.velocity.y + (gravity.y * dt);
    point.color[3] -= 0.01;    
    }
function drawPoint(point) {
    ctx.beginPath();
    ctx.arc(point.position.x, point.position.y, point.size, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(" + point.color[0] + "," + point.color[1]+ "," + point.color[2] + "," + point.color[3] + ")";
    ctx.fill();
}

function fall(tab){
    for (var i = 0; i < tab.length; i++){
        if (tab[i].count < 100){
            drawPoint(tab[i]);
            drop(tab[i]);
            tab[i].count++;
        } else {
            tab.splice(i, 1);
        }
    }
}

function animation(tab){
    clearCanvas();
    fall(tab);
}

function clearCanvas(){
    void ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
}