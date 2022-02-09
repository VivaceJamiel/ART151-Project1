var circles = [];
var num = -1;
var white = {r: 255, g: 255, b: 255};
var backgroundColor = {r: 255, g: 255, b: 255};
var clicked = false;
var fade = 255;
var clickedCircle = {x: 0, y: 0, size: 0, c: {r: 0, g: 0, b: 0}, speed: 0, opacity: 0};
var yoff = 0.0;
var ran = 1;
var ran2 = 1;
var ranFound = false;
var introed = false;
var introed2 = false;
var intro_opacity = 255;
var intro_circle_size = 0;
var wait = false;
var wait_size = 0;
var glow = 255;
var glow_speed = 2;

// Have an intro to the piece
function introWait() {
    background(0);
    fill(0);
    circle(windowWidth/2, windowHeight/2, wait_size);
    if (wait_size < 75) {
        wait_size += 1;
    } else {
        wait = true;
    }
}

function intro1() {
    if (!wait) {
        introWait();
    } else {
        background(0);
        glow += glow_speed;
        fill(glow); 
        circle(windowWidth/2, windowHeight/2, intro_circle_size);
        if(intro_circle_size < windowWidth/4){
            intro_circle_size += (0.05+0.05*intro_circle_size);
        }    
        if (glow < 155 || glow > 255) {
            glow_speed *= -1;
        }
    }
}

function intro2() {
    if (intro_circle_size < windowWidth*2) {
        fill(0, 255);
        circle(windowWidth/2, windowHeight/2, windowWidth*3);
    }
    fill(255, fade);
    circle(windowWidth/2, windowHeight/2, intro_circle_size);


    if (intro_circle_size < windowWidth*1000) {
        intro_circle_size += 0.2*intro_circle_size;
    } else {
        fade -= 1+0.01*fade;
        if (fade <= 0) {
            introed2 = true;
        }
    }
}

function setup() {
    alert("Welcome to the piece\nPlease click the white circle after it stops growing\nThen click any circle afterwards");
    createCanvas(windowWidth, windowHeight);
    // You can make the parallax effect by classifying the circles by their size and assign the speed to each size
    // The bigger the circle, the faster it moves
    for (var i = 0; i < 100; i++) {
        var grayfactor = 0;
        var speed;
        var size = random(80)+20;
        if (size > 80) {
            grayfactor = 1;
            speed = random(0.5, 1.0);
        } else if (size > 60 && size <= 80) {
            grayfactor = 1.2;
            speed = random(1.0, 1.5);
        } else if (size > 40 && size <= 60) {
            grayfactor = 1.4;
            speed = random(1.5, 2.0);
        } else if (size > 20 && size <= 40) {
            grayfactor = 1.6;
            speed = random(2.0, 2.5);
        } else {
            grayfactor = 1.8;
            speed = random(2.5, 3.0);
        }
        var r = random(255);
        var g = random(255);
        var b = random(255);
        var c = grayer(r, g, b, grayfactor);
        var nCircle = new Circle(random(windowWidth), random(windowHeight), c, size, speed, 255);
        circles.push(nCircle);
    }
    noStroke();
}

function grayer(r, g, b, grayfactor) {
    var newr = r * grayfactor;
    var newg = g * grayfactor;
    var newb = b * grayfactor;
    return {r: newr, g: newg, b: newb};
}

var t = 0;

function movementType(val) {
    for (var i = 0; i < circles.length; i++) {
        fill(circles[i].c.r, circles[i].c.g, circles[i].c.b, circles[i].opacity);
        ellipse(circles[i].x, circles[i].y, circles[i].size);
        circles[i].move(val);
    }
}


// YOU TRYING TO HAVE IT WHERE WHEN YOU CLICK IT CHANGES THE EFFECT


function draw() {
    if(!introed){
        intro1();
    } else {
        background(backgroundColor.r, backgroundColor.g, backgroundColor.b);

        movementType(ran);

        if (clicked) {
            fill(circles[num].c.r, circles[num].c.g, circles[num].c.b, circles[num].opacity);
            circle(clickedCircle.x, clickedCircle.y, clickedCircle.size);
            if (clickedCircle.size < windowWidth*2.5) {
                clickedCircle.size += 30;
            } else {
                backgroundColor = {r: clickedCircle.c.r, g: clickedCircle.c.g, b: clickedCircle.c.b};
                if (!ranFound) {
                    ran = Math.floor(random(1, 5));
                    ran2 = Math.floor(random(255));
                    ranFound = true;
                }
                if (circles[num].opacity > 0) {
                    circles[num].opacity -= 4;
                } else {
                    circles[num].opacity = 0;
                    ranFound = false;
                    var nCircle = new Circle(random(windowWidth), random(windowHeight), {r: random(255), g: random(255), b: random(255)}, random(80)+20, random(1, 3));
                    circles[num] = nCircle;    
                    clickedCircle.size = 0;
                    clicked = false;
                }
            }
        }
        noiseMove(ran2%2);  
        if (!introed2) {
            intro2();
        }  
    }
}

function noiseMove(val) {
    if (val == 1) {

    } else {
        if (ran != 3 && ran != 4) {
            var xoff = 0;
            for (var i = 0; i < circles.length; i++) {
                var y = map(noise(xoff, yoff), 0, 1, 0, windowHeight);
                circles[i].y = y;
                xoff += 0.01;
            }
            yoff += 0.01;
        } else {
            var xoff = 0;
            for (var i = 0; i < circles.length; i++) {
                var y = map(noise(xoff, yoff), 0, 1, 0, windowHeight);
                circles[i].x = y;
                xoff += 0.01;
            }
            yoff += 0.01;

        }
    }
}

function mousePressed() {
    if (introed) {
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
    } else {
        introed = true;
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

    move(num) {
        switch (num) {
            case 1:
                this.x -= this.speed;
                if (this.x < 0) {
                    this.x = windowWidth;
                }
                break;
            case 2:
                this.x += this.speed;
                if (this.x > windowWidth) {
                    this.x = 0;
                }
                break;
            case 3:
                this.y -= this.speed;
                if (this.y < 0) {
                    this.y = windowHeight;
                }
                break;
            case 4:
                this.y += this.speed;
                if (this.y > windowHeight) {
                    this.y = 0;
                }
                break;
            default:
                break;
        }
    }

    expand() {
        while (this.size < windowWidth*2) {
            this.size += this.speed;
        }
        this.size = 0;
    }
}