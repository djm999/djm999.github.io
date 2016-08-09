var imgHeight=1334;

var start=1;
var finish=36;

var nImages=finish-start;
var imgs = [];
var n;

var c,r,shaken;

function preload() {
  for (var i = start; i<finish; i++) {
    imgs[i-start]=loadImage("img/eye_"+str(i)+".jpg");
  }
}
function setup() {
  frameRate(30);
  if (windowHeight>imgHeight) {
    createCanvas(imgHeight*820/1334, imgHeight);
    r=1;
  }
  else {
    r=windowHeight/imgHeight;
    createCanvas(windowHeight*820/1334, windowHeight);
  }
  image(imgs[nImages-1], 0, 0,imgHeight*r*820/1334,imgHeight*r);
  shaken=0; 
  c=color("rgba(255,255,255,0.7)");
}

function draw() {
  if (shaken===1){
    if (n<nImages){
      n+=1;
    }
    if (n===nImages){
      n=nImages-1;
      shaken=0;
    }
    println(n);
    image(imgs[n], 0, 0,imgHeight*r*820/1334,imgHeight*r);
  }
  else {
    image(imgs[nImages-1], 0, 0,imgHeight*r*820/1334,imgHeight*r);
  }
  textSize(r*72);
  textAlign(CENTER);
  fill(c);
  text("shake your device",width/2,height*0.8);
}

function deviceShaken() {
  shaken=1;
  n=0;
  c=color("rgba(255,255,255,0)");
}

function mousePressed() {
  shaken=1;
  n=0;
  c=color("rgba(255,255,255,0)");
}

function windowResized() {
  if (windowHeight>imgHeight) {
  resizeCanvas(imgHeight*820/1334, imgHeight);
  r=1;
  }
  else {
    r=windowHeight/imgHeight;
    resizeCanvas(windowHeight*820/1334, windowHeight);
  }
}
