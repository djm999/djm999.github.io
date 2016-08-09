var imgWidth=1024;
var imageNumber;
var n,touched;

var hotAreaLeftW=101, hotAreaLeftH=79, hotAreaLeftX=179, hotAreaLeftY=351;
var hotAreaRightW=58, hotAreaRightH=76, hotAreaRightX=592, hotAreaRightY=352;
var r;

var start=1;
var finish=33;

var nImages=finish-start;
var imgs = [];

var xl=(hotAreaLeftX+hotAreaLeftW),yl=(hotAreaLeftY+hotAreaLeftH/2),xr=hotAreaRightX,yr=(hotAreaRightY+hotAreaRightH/2);
var anim=58;
var c;

function setup() {
  if (windowWidth>imgWidth) {
    createCanvas(imgWidth, imgWidth*9/16);
    r=1;
  }
  else {
    r=windowWidth/imgWidth;
    createCanvas(windowWidth, windowWidth*9/16);
  }
  for (var i = start; i<finish; i++) {
    imgs[i-start]=loadImage("img/sock s_"+str(i)+".jpg");
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
  xl=xl-0.5;
  xr=xr+0.5;
  if (xl<(hotAreaLeftX+hotAreaLeftW-anim)) {
    xl=(hotAreaLeftX+hotAreaLeftW);
  }
  if (xr>(hotAreaRightX+anim)) {
    xr=hotAreaRightX;
  }
}

function touchMoved(){
  if ((touchX>r*hotAreaLeftX) && (touchX<r*(hotAreaLeftX+hotAreaLeftW)) && (touchY>r*hotAreaLeftY) && (touchY<r*(hotAreaLeftY+hotAreaLeftH)) 
  ){
  imageNumber=(nImages-1)*(r*(hotAreaLeftX+hotAreaLeftW)-(touchX))/(r*hotAreaLeftW);
  c=color('rgba(255,255,255,0)');
  touched=1;
  }
  if ((touchX>r*hotAreaRightX) && (touchX<r*(hotAreaRightX+hotAreaRightW)) && (touchY>r*hotAreaRightY) && (touchY<r*(hotAreaRightY+hotAreaRightH)) 
  ){
  imageNumber=(nImages-1)*((touchX)-r*hotAreaRightX)/(r*hotAreaRightW);
  c=color('rgba(255,255,255,0)');
  touched=1;
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
