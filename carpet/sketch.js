var imgWidth=1024;
var imageNumber;
var n,touched;

var start=1;
var finish=40;

var nImages=finish-start;
var imgs = [];

// var hotAreaLeftW=752, hotAreaLeftH=95, hotAreaLeftX=199, hotAreaLeftY=242;
var hotAreaRightW=669, hotAreaRightH=571, hotAreaRightX=161, hotAreaRightY=2, k=hotAreaRightH/hotAreaRightW;
// var xl=(hotAreaLeftX+hotAreaLeftW),yl=(hotAreaLeftY+hotAreaLeftH/2);
var xr=hotAreaRightX,yr=hotAreaRightY;
var anim=669, speed=4;
var c,r;

function preload(){
  for (var i = start; i<finish; i++) {
    imgs[i-start]=loadImage("img/carpet_"+str(i)+".jpg");
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
    imageNumber=0;
    if (touched===0){
      c=color('rgba(255,255,255,0.5)');
    }
    if (touched===1){
      c=color('rgba(255,255,255,0)');
    }
  }
  
  println(imageNumber);
  n=ceil(imageNumber);
  image(imgs[n], 0, 0,imgWidth*r,imgWidth*r*9/16);
  
  fill(c);
  noStroke();
  // ellipse(xl*r,yl*r,30*r,30*r);
  ellipse(xr*r,yr*r,50*r,50*r);
  // xl=xl-speed;
  xr=xr+speed;
  yr=yr+k*speed;
  // if ((xl<(hotAreaLeftX+hotAreaLeftW-anim)) || (xl>(hotAreaLeftX+hotAreaLeftW))) {
  //   speed=speed*(-1);
  // }
  if ((xr>(hotAreaRightX+anim)) || (xr<hotAreaRightX)) {
    speed=speed*(-1);
  }
}

function touchMoved(){
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
