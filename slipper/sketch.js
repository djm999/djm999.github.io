var imgWidth=1024;
var imageNumber;
var n;

var hotAreaLeftW=89, hotAreaLeftH=173, hotAreaLeftX=732, hotAreaLeftY=181;
var hotAreaRightW=73, hotAreaRightH=131, hotAreaRightX=176, hotAreaRightY=139;
var r;

var start=1;
var finish=37;

var nImages=finish-start;
var imgs = [];

var xl=(hotAreaLeftX+hotAreaLeftW/2),yl=(hotAreaLeftY+hotAreaLeftH);
var xr=(hotAreaRightX+hotAreaRightW/2),yr=(hotAreaRightY+hotAreaRightH);
var anim=40;
var c;

function preload(){
  for (var i = start; i<finish; i++) {
    imgs[i-start]=loadImage("img/slipper_"+str(i)+".jpg");
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
    if (imageNumber>1){
    imageNumber-=2;
    }
    else {
    imageNumber=0;
    }
    c=color('rgba(255,255,255,0.5)');
  }
  println(imageNumber);
  n=ceil(imageNumber);
  image(imgs[n], 0, 0,imgWidth*r,imgWidth*r*9/16);
  
  fill(c);
  noStroke();
  ellipse(xl*r,yl*r,30*r,30*r);
  ellipse(xr*r,yr*r,30*r,30*r);
  yl=yl-1;
  yr=yr-1;
  if (yl<(hotAreaLeftY+hotAreaLeftH-anim)) {
    yl=(hotAreaLeftY+hotAreaLeftH);
  }
  if (yr<(hotAreaRightY+hotAreaRightH-anim)) {
    yr=(hotAreaRightY+hotAreaRightH);
  }
}

function touchMoved(){
  if ((touchX>r*hotAreaLeftX) && (touchX<r*(hotAreaLeftX+hotAreaLeftW)) && (touchY>r*hotAreaLeftY) && (touchY<r*(hotAreaLeftY+hotAreaLeftH)) 
  ){
  imageNumber=(nImages-1)*(r*(hotAreaLeftY+hotAreaLeftH)-touchY)/(r*hotAreaLeftH);
  c=color('rgba(255,255,255,0)');
  }
  if ((touchX>r*hotAreaRightX) && (touchX<r*(hotAreaRightX+hotAreaRightW)) && (touchY>r*hotAreaRightY) && (touchY<r*(hotAreaRightY+hotAreaRightH)) 
  ){
  imageNumber=(nImages-1)*(r*(hotAreaRightY+hotAreaRightH)-touchY)/(r*hotAreaRightH);
  c=color('rgba(255,255,255,0)');
  }
  return false;
}

function windowResized() {
  if (windowWidth>imgWidth) {
  resizeCanvas(imgWidth, imgWidth*9/16);
  r=1;
  }
  else {
    r=windowWidth/imgWidth;
    resizeCanvas(windowWidth, windowWidth*9/16);
  }
}
