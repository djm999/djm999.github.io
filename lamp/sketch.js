var imgWidth=1024;
var imageNumber;
var n, touched, fixImage, switched;

var start=2;
var finish=59;

var nImages=finish-start;
var imgs = [];
var imgStart;

var hotAreaLeftW=250, hotAreaLeftH=238, hotAreaLeftX=610, hotAreaLeftY=113;
var switchW=80, switchH=77, switchX=252, switchY=480;
var xl=(hotAreaLeftX+58),yl=hotAreaLeftY;
var cx=(switchX+switchW/2),cy=(switchY+switchH/2),cr=20;
var anim=60,speed=0.3;
var cSwitch,cBulb,r;
var switchSound;

function preload(){
  for (var i = start; i<(finish+1); i++) {
    imgs[i-start]=loadImage("img/lamp_"+str(i)+".jpg");
  }
  switchSound=loadSound("switch.mp3");
  imgStart=loadImage("img/lamp_1.jpg");
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
  switched=0;
}

function draw() {
  var down = mouseIsPressed || touchIsDown;
  
  if ((down === false) && (switched===0)){
    image(imgStart,0,0,imgWidth*r,imgWidth*r*9/16);
    cSwitch=color('rgba(255,255,255,0.3)');
    cBulb=color('rgba(255,255,255,0)');
  }
  
  if ((down === false) && (switched===1)){
    if (touched===1) {
    imageNumber=fixImage;
    cBulb=color('rgba(255,255,255,0)');
    }
    if (touched===0) {
    imageNumber=0;
    cBulb=color('rgba(255,255,255,0.3)');
    }
    cSwitch=color('rgba(255,255,255,0)');
    n=ceil(imageNumber);
    image(imgs[n], 0, 0,imgWidth*r,imgWidth*r*9/16);
  }
  
  fill(cBulb);
  noStroke();
  ellipse(xl*r,yl*r,20*r,20*r);
  yl=yl+1;
  if (yl>(hotAreaLeftY+anim)) {
    yl=hotAreaLeftY;
  }
  
  fill(cSwitch);
  noStroke();
  ellipse(cx*r,cy*r,cr*r,cr*r);
  cr=cr+speed;
  if ((cr<10) || (cr>30)) {
    speed=speed*(-1);
  }
  
}

function touchMoved(){
  if ((touchX>r*hotAreaLeftX) && (touchX<r*(hotAreaLeftX+hotAreaLeftW)) && (touchY>r*hotAreaLeftY) && (touchY<r*(hotAreaLeftY+hotAreaLeftH)) 
  && (switched===1)){
  imageNumber=(nImages-1)*(touchY-r*hotAreaLeftY)/(r*hotAreaLeftH);
  fixImage=imageNumber;
  cBulb=color('rgba(255,255,255,0)');
  cSwitch=color('rgba(255,255,255,0)');
  touched=1;
  n=ceil(imageNumber);
  image(imgs[n], 0, 0,imgWidth*r,imgWidth*r*9/16);
  }
  return false;
}

function touchEnded(){
  
    var distance = dist (touchX,touchY,r*(switchX+switchW/2),r*(switchY+switchH/2));
    
    if ((distance<40*r) && (switched===0)) {
    switchSound.play();
    imageNumber=0;
    switched=1;
    cSwitch=color('rgba(255,255,255,0)');
    n=ceil(imageNumber);
    image(imgs[n], 0, 0,imgWidth*r,imgWidth*r*9/16);
    }
    
    else if ((distance<40*r) && (switched===1)) {
    switchSound.play();
    switched=0;
    touched=0;
    image(imgStart,0,0,imgWidth*r,imgWidth*r*9/16);
    cSwitch=color('rgba(255,255,255,0.3)');
    cBulb=color('rgba(255,255,255,0)');
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
