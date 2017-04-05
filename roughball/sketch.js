var imgWidth=1920;
var imageNumber;
var n, touched, fixImage;

var start=1;
var finish=57;

var nImages=finish-start;
var imgs = [];

var hotAreaLeftW=1500, hotAreaLeftH=290, hotAreaLeftX=210, hotAreaLeftY=0;

var r,w;

function preload() {
  for (var i = start; i<finish; i++) {
    imgs[i-start]=loadImage("img/roughball_"+str(i)+".jpg");
  }
}

function setup() {
  if (windowWidth>imgWidth) {
    createCanvas(imgWidth, imgWidth*9/16);
    r=1;
  }
  else {
    r=windowWidth/imgWidth;
    createCanvas(windowWidth, windowWidth*9/16);
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
  image(imgs[n], 0, 0,imgWidth*r,imgWidth*r*9/16);
}

function touchMoved(){
  if ((touchX>r*hotAreaLeftX) && (touchX<r*(hotAreaLeftX+hotAreaLeftW)) && (touchY>r*hotAreaLeftY) && (touchY<r*(hotAreaLeftY+hotAreaLeftH)) 
  ){
  imageNumber=(nImages-1)*(touchX-r*hotAreaLeftX)/(r*hotAreaLeftW);
  fixImage=imageNumber;
  c=color('rgba(255,255,255,0)');
  touched=1;
  }
  return false;
}

function windowResized() {
  w=width;
  if (windowWidth>imgWidth) {
  resizeCanvas(imgWidth, imgWidth*9/16);
  r=1;
  }
  else {
    r=windowWidth/imgWidth;
    resizeCanvas(windowWidth, windowWidth*9/16);
  }
}


