var circles = [];
var num = -1;
var white = {r: 255, g: 255, b: 255};
var backgroundColor = {r: 255, g: 255, b: 255};
var clicked = false;
var fade = 255;
var clickedCircle = {x: 0, y: 0, size: 0, c: {r: 0, g: 0, b: 0}, speed: 0, opacity: 0};

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (var i = 0; i < 50; i++) {
        var nCircle = new Circle(random(windowWidth), random(windowHeight), {r: random(255), g: random(255), b: random(255)}, random(80)+20, random(1, 3), 255);
        circles.push(nCircle);
    }
    noStroke();
}

function draw() {
    background(backgroundColor.r, backgroundColor.g, backgroundColor.b);

    for (var i = 0; i < circles.length; i++) {
        fill(circles[i].c.r, circles[i].c.g, circles[i].c.b, circles[i].opacity);
        ellipse(circles[i].x, circles[i].y, circles[i].size);
        circles[i].move(circles[i].y, circles[i].speed);
    }

    if (clicked) {
        fill(circles[num].c.r, circles[num].c.g, circles[num].c.b, circles[num].opacity);
        circle(clickedCircle.x, clickedCircle.y, clickedCircle.size);
        if (clickedCircle.size < windowWidth*2) {
            clickedCircle.size += 30;
        } else {
            console.log(circles[num].opacity);
            if (circles[num].opacity > 0) {
                backgroundColor = {r: clickedCircle.c.r, g: clickedCircle.c.g, b: clickedCircle.c.b};
                circles[num].opacity -= 2;
            } else {
                circles.splice(i, 1);
                var nCircle = new Circle(random(windowWidth), random(windowHeight), {r: random(255), g: random(255), b: random(255)}, random(80)+20, random(1, 3));
                circles[i] = nCircle;    
                clickedCircle.size = 0;
                clicked = false;
                background(backgroundColor.r, backgroundColor.g, backgroundColor.b);    
            }
        }
    }
}

function mousePressed() {
    var mX = mouseX;
    var mY = mouseY;

    for (var i = 0; i < circles.length; i++) {
        var d = dist(mX, mY, circles[i].x, circles[i].y);
        if (d < circles[i].size / 2) {
            num = i;
            clickedCircle = circles[i];
            clicked = true;
        }
    }
}

class Circle {
    constructor(x, y, c, size, speed) {
        this.x = x;
        this.y = y;
        this.c = c;
        this.size = size;
        this.speed = speed;
        this.opacity = 255;
    }

    move() {
        this.y += this.speed;
        if (this.y > windowHeight) {
            this.y = 0;
        }
    }

    expand() {
        while (this.size < windowWidth*2) {
            this.size += this.speed;
        }
        this.size = 0;
    }
}