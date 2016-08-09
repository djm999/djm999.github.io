var imgWidth=1024;
var imageNumber;
var n,touched,fixImage;

// var hotAreaLeftW=99, hotAreaLeftH=77, hotAreaLeftX=175, hotAreaLeftY=343;
var hotAreaRightW=699, hotAreaRightH=309, hotAreaRightX=120, hotAreaRightY=206;
var r;

var blockL=123,blockW=86;
var blockRX=156;

var start=14;
var finish=78;

var nImages=finish-start;
var imgs = [];

// var xl=(hotAreaLeftX+hotAreaLeftW),yl=(hotAreaLeftY+hotAreaLeftH/2);
var xr=hotAreaRightX,yr=(hotAreaRightY+hotAreaRightH/2-30);
var anim=60,speed=1;
var c;

var openSound,closeSound1,closeSound2,sound,soundPlay;
var direction;

function preload(){
  for (var i = start; i<finish; i++) {
    imgs[i-start]=loadImage("img/drawerl_"+str(i)+".jpg");
  }
  openSound=loadSound("open.mp3");
  closeSound1=loadSound("close1.mp3");
  closeSound2=loadSound("close2.mp3");
}

function setup() {
  if (windowWidth>imgWidth) {
    createCanvas(imgWidth, imgWidth*571/1024);
    r=1;
  }
  else {
    r=windowWidth/imgWidth;
    createCanvas(windowWidth, windowWidth*571/1024);
  }
  touched=0;
  soundPlay=false;
}

function draw() {
  var down=mouseIsPressed || touchIsDown;
  
  if (down === false){
    if (touched===1) {
    imageNumber=fixImage;
    c=color('rgba(255,255,255,0)');
    }
    if (touched===0) {
    imageNumber=0;
    c=color('rgba(255,255,255,0.5)');
    }
    soundPlay=false;
  }
  

  println(imageNumber);
  n=ceil(imageNumber);
  image(imgs[n], 0, 0,imgWidth*r,imgWidth*r*571/1024);
  
  fill(c);
  noStroke();
  // ellipse(xl*r,yl*r,30*r,30*r);
  ellipse(xr*r,yr*r,30*r,30*r);
  // xl=xl-0.5;
  xr=xr+speed;
  if (xr>(hotAreaRightX+anim)) {
    xr=hotAreaRightX;
  }
}

// function touchStarted(){
//   var down=mouseIsPressed || touchIsDown;
//   if (down===true){
//     if (sound==='open' && soundPlay===false){
//       openSound.play();
//       soundPlay=true;
//     }
//     if (sound==='close1' && soundPlay===false){
//       closeSound1.play();
//       soundPlay===true;
//     }
//     if (sound==='close2'  && soundPlay===false){
//       closeSound2.play();
//       soundPlay===true;
//     }
//   }
// }

function touchMoved(){
  if ((touchX>r*hotAreaRightX) && (touchX<r*(hotAreaRightX+hotAreaRightW)) 
  && (touchY>r*hotAreaRightY) && (touchY<r*(hotAreaRightY+hotAreaRightH))){
    c=color('rgba(255,255,255,0)');
    touched=1;
    if ((touchX-ptouchX)>0){
      direction='open';
      if (touchX<r*(hotAreaRightX+blockL)){
        imageNumber=0;
        fixImage=imageNumber;
      }
      else {
        imageNumber=(nImages-1)*((touchX)-r*hotAreaRightX)/(r*hotAreaRightW);
        fixImage=imageNumber;
      }
    }
    
    if ((touchX-ptouchX)<0) {
      direction='close';
      if ((touchX<r*blockRX) || (touchX>r*(blockRX+blockW))){
        imageNumber=(nImages-1)*((touchX)-r*hotAreaRightX)/(r*hotAreaRightW);
        fixImage=imageNumber;
      }
    }
  }
  if ((touchX>r*(hotAreaRightX+blockL)) && (ptouchX<r*(hotAreaRightX+blockL)) && (direction==='open')){
    openSound.play();
  }
  if ((touchX<r*(blockRX+blockW)) && (ptouchX>r*(blockRX+blockW)) && (direction==='close')){
    closeSound1.play();
  }
  if ((touchX<r*blockRX) && (ptouchX>r*blockRX) && (direction==='close')){
    closeSound2.play();
  }
  return false;
}

function windowResized() {
  if (windowWidth>imgWidth) {
  resizeCanvas(imgWidth, imgWidth*571/1024);
  r=1;
  }
  else {
    r=windowWidth/imgWidth;
    resizeCanvas(windowWidth, windowWidth*571/1024);
  }
}
