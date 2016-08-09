var imgWidth=1024;
var imageNumberL,imageNumberR;
var nl,nr,touched;

// var hotAreaLeftW=99, hotAreaLeftH=77, hotAreaLeftX=175, hotAreaLeftY=343;
var hotAreaRightW=509, hotAreaRightH=100, hotAreaRightX=251, hotAreaRightY=225;
var r;

var startL=2;
var finishL=29;

var nImagesL=finishL-startL;
var imgsL = [];
var startImageL;

var startR=4;
var finishR=33;

var nImagesR=finishR-startR;
var imgsR = [];
var startImageR;

var direction;

// var xl=(hotAreaLeftX+hotAreaLeftW),yl=(hotAreaLeftY+hotAreaLeftH/2);
var xr=hotAreaRightX,yr=(hotAreaRightY+hotAreaRightH/2);
var anim=509,speed=3;
var c;

// var brushSound,soundPlay;

function preload() {
  for (var i = startL; i<finishL; i++) {
    imgsL[i-startL]=loadImage("imgl/brushl_"+str(i)+".jpg");
  }
  for (var j = startR; j<finishR; j++) {
    imgsR[j-startR]=loadImage("imgr/brushr_"+str(j)+".jpg");
  }
  startImageL=loadImage("imgl/brushl_1.jpg");
  startImageR=loadImage("imgr/brushr_3.jpg");
  // brushSound=loadSound("brush1.mp3");
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
  direction='left';
  // soundPlay=false;
}

function draw() {
  var down=touchIsDown || mouseIsPressed;
  
  if (down === false){
    if (direction==='left'){
      image(startImageL, 0, 0,imgWidth*r,imgWidth*r*9/16);
    }
    if (direction==='right'){
      image(startImageR, 0, 0,imgWidth*r,imgWidth*r*9/16);
    }
    if (touched===0){
      c=color('rgba(255,255,255,0.5)');
    }
    if (touched===1){
      c=color('rgba(255,255,255,0)');
    }
  }
    
  // if ((touchX-ptouchX===0) && down === true){
  //   brushSound.stop();
  //   soundPlay=false;
  // }
  // if (touchX-ptouchX!==0  && soundPlay===false && down === true){
  //   touchStarted();
  // }
  
  fill(c);
  noStroke();
  ellipse(xr*r,yr*r,30*r,30*r);
  xr=xr+speed;
  if ((xr>(hotAreaRightX+anim)) || (xr<hotAreaRightX)) {
    speed=speed*(-1);
  }
}

// function touchStarted(){
//   if ((touchX>r*hotAreaRightX) && (touchX<r*(hotAreaRightX+hotAreaRightW)) && (touchY>r*hotAreaRightY) && (touchY<r*(hotAreaRightY+hotAreaRightH)) 
//   ){
//     brushSound.loop();
//     brushSound.play();
//     soundPlay=true;
//   }
//   return false;
// }

function touchMoved(){
  if ((touchX>r*hotAreaRightX) && (touchX<r*(hotAreaRightX+hotAreaRightW)) && (touchY>r*hotAreaRightY) && (touchY<r*(hotAreaRightY+hotAreaRightH)) 
    ){
      c=color('rgba(255,255,255,0)');
      if ((touchX-ptouchX)<0){
        imageNumberR=(nImagesR-1)*(r*(hotAreaRightX+hotAreaRightW)-(touchX))/(r*hotAreaRightW);
        nr=ceil(imageNumberR);
        image(imgsR[nr], 0, 0,imgWidth*r,imgWidth*r*9/16);
        direction='right';
      }
      if ((touchX-ptouchX)>0){
        imageNumberL=(nImagesL-1)*((touchX)-r*hotAreaRightX)/(r*hotAreaRightW);
        nl=ceil(imageNumberL);
        image(imgsL[nl], 0, 0,imgWidth*r,imgWidth*r*9/16);
        direction='left';
      }
      touched=1;
    }
  return false;
}

// function touchEnded(){
//   brushSound.stop();
//   return false;
// }

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
