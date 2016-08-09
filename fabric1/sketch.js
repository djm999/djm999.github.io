var imgHeight=1024;
var imageNumber;
var n, touched, fixImage;

var start=1;
var finish=58;

var nImages=finish-start;
var imgs = [];

var hotAreaLeftW=143, hotAreaLeftH=863, hotAreaLeftX=228, hotAreaLeftY=139;
// var hotAreaRightW=57, hotAreaRightH=74, hotAreaRightX=578, hotAreaRightY=344;
var xl=(hotAreaLeftX+hotAreaLeftW/2),yl=(hotAreaLeftY+hotAreaLeftH);
// var xr=hotAreaRightX,yr=(hotAreaRightY+hotAreaRightH/2);
var anim=60;
var c,r;

function preload(){
  for (var i = start; i<finish; i++) {
    imgs[i-start]=loadImage("imgsc/cloth_"+str(i)+".jpg");
  }
}

function setup() {
  if (windowHeight>imgHeight) {
    createCanvas(imgHeight*605/1024, imgHeight);
    r=1;
  }
  else {
    r=windowHeight/imgHeight;
    createCanvas(windowHeight*605/1024, windowHeight);
  }
  touched=0;
}

function draw() {
  var down=touchIsDown || mouseIsPressed;
  
  if (down === false){
    if (touched===1) {
    imageNumber=fixImage;
    c=color('rgba(255,255,255,0)');
    }
    if (touched===0) {
    imageNumber=0;
    c=color('rgba(255,255,255,0.5)');
    }
  }
  
  println(imageNumber);
  n=ceil(imageNumber);
  image(imgs[n], 0, 0,imgHeight*r*605/1024,imgHeight*r);
  
  fill(c);
  noStroke();
  ellipse(xl*r,yl*r,40*r,40*r);
  yl=yl-1;
  if (yl<(hotAreaLeftY+hotAreaLeftH-anim)) {
    yl=(hotAreaLeftY+hotAreaLeftH);
  }
}

function touchMoved(){
  if ((touchX>r*hotAreaLeftX) && (touchX<r*(hotAreaLeftX+hotAreaLeftW)) && (touchY>r*hotAreaLeftY) && (touchY<r*(hotAreaLeftY+hotAreaLeftH)) 
  ){
  imageNumber=(nImages-1)*(r*(hotAreaLeftY+hotAreaLeftH)-touchY)/(r*hotAreaLeftH);
  fixImage=imageNumber;
  c=color('rgba(255,255,255,0)');
  touched=1;
  }
  return false;
}

function windowResized() {
  if (windowHeight>imgHeight) {
  resizeCanvas(imgHeight*605/1024, imgHeight);
  r=1;
  }
  else {
    r=windowHeight/imgHeight;
    resizeCanvas(windowHeight*605/1024, windowHeight);
  }
}
