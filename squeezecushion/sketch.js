var imgWidth=1024;
var imageNumber;
var n;

//hot areas mapping
var hotAreaLeftW=92, hotAreaLeftH=51, hotAreaLeftX=297, hotAreaLeftY=266;
var hotAreaRightW=100, hotAreaRightH=75, hotAreaRightX=630, hotAreaRightY=245;
var r;

var start=1;
var finish=58;

var nImages=finish-start;
var imgs = [];

//interaction cues 
var xl=hotAreaLeftX,yl=(hotAreaLeftY+hotAreaLeftH/2),xr=(hotAreaRightX+hotAreaRightW),yr=(hotAreaRightY+hotAreaRightH/2);
var anim=60;
var c;

function preload(){
 for (var i = start; i<(finish+1); i++) {
    imgs[i-start]=loadImage("img/scushion_"+str(i)+".jpg");
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
}

function draw() {
  var down=mouseIsPressed || touchIsDown;

  if (down === false){
    if (imageNumber>2){
      imageNumber-=3;
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
  
  xl=xl+1;
  xr=xr-1;
  if (xl>(hotAreaLeftX+anim)) {
    xl=hotAreaLeftX;
  }
  if (xr<(hotAreaRightX+hotAreaRightW-anim)) {
    xr=(hotAreaRightX+hotAreaRightW);
  }
}

function touchMoved(){
  if ((touchX>r*hotAreaLeftX) && (touchX<r*(hotAreaLeftX+hotAreaLeftW)) && (touchY>r*hotAreaLeftY) && (touchY<r*(hotAreaLeftY+hotAreaLeftH)) 
  ){
    imageNumber=(nImages-1)*((touchX)-r*hotAreaLeftX)/(r*hotAreaLeftW);
    c=color('rgba(255,255,255,0)');
  }
  if ((touchX>r*hotAreaRightX) && (touchX<r*(hotAreaRightX+hotAreaRightW)) && (touchY>r*hotAreaRightY) && (touchY<r*(hotAreaRightY+hotAreaRightH)) 
  ){
    imageNumber=(nImages-1)*(r*(hotAreaRightX+hotAreaRightW)-(touchX))/(r*hotAreaRightW);
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