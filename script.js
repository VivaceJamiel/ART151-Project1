var circles = [];
backgroundColor = {r: 255, g: 255, b: 255};

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (var i = 0; i < 50; i++) {
        var nCircle = new Circle(random(windowWidth), random(windowHeight), {r: random(255), g: random(255), b: random(255)}, random(80)+20, random(1, 3));
        circles.push(nCircle);
    }
    noStroke();
}

function draw() {
    background(backgroundColor.r, backgroundColor.g, backgroundColor.b);


    for (var i = 0; i < circles.length; i++) {
        fill(circles[i].c.r, circles[i].c.g, circles[i].c.b);
        ellipse(circles[i].x, circles[i].y, circles[i].size);
        circles[i].move(circles[i].y, circles[i].speed);
    }
}

function mousePressed() {
    var mX = mouseX;
    var mY = mouseY;

    for (var i = 0; i < circles.length; i++) {
        var d = dist(mX, mY, circles[i].x, circles[i].y);
        circle(mouseX, mouseY, 100);
        if (d < circles[i].size / 2) {
            backgroundColor = {r: circles[i].c.r, g: circles[i].c.g, b: circles[i].c.b};
            circles.splice(i, 1);
            var nCircle = new Circle(random(windowWidth), random(windowHeight), {r: random(255), g: random(255), b: random(255)}, random(80)+20, random(1, 3));
            circles[i] = nCircle;
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
    }

    move() {
        this.y += this.speed;
        if (this.y > windowHeight) {
            this.y = 0;
        }
    }
}