var imgWidth=1920;
var imageNumber;
var n;

var hotAreaTopW=234, hotAreaTopH=138, hotAreaTopX=866, hotAreaTopY=342;
var hotAreaBotW=234, hotAreaBotH=101, hotAreaBotX=866, hotAreaBotY=686;
var r;

var start=1;
var finish=27;

var nImages=finish-start;
var imgs = [];

var xl=(732+89/2),yl=(hotAreaTopY+hotAreaTopH);
var xr=(hotAreaBotX+73/2),yr=(hotAreaBotY+hotAreaBotH);
var anim=40;
var c;

function preload(){
  for (var i = start; i<finish; i++) {
    imgs[i-start]=loadImage("img/squeezeball_"+str(i)+".jpg");
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
  
  // fill(c);
  // noStroke();
  // ellipse(xl*r,yl*r,30*r,30*r);
  // ellipse(xr*r,yr*r,30*r,30*r);
  // yl=yl-1;
  // yr=yr-1;
  // if (yl<(hotAreaTopY+hotAreaTopH-anim)) {
  //   yl=(hotAreaTopY+hotAreaTopH);
  // }
  // if (yr<(hotAreaBotY+hotAreaBotH-anim)) {
  //   yr=(hotAreaBotY+hotAreaBotH);
  // }
}

function touchMoved(){
  if ((touchX>r*hotAreaTopX) && (touchX<r*(hotAreaTopX+hotAreaTopW)) && (touchY>r*hotAreaTopY) && (touchY<r*(hotAreaTopY+hotAreaTopH)) 
  ){
  imageNumber=(nImages-1)*(touchY-r*hotAreaTopY)/(r*hotAreaTopH);
  c=color('rgba(255,255,255,0)');
  }
  if ((touchX>r*hotAreaBotX) && (touchX<r*(hotAreaBotX+hotAreaBotW)) && (touchY>r*hotAreaBotY) && (touchY<r*(hotAreaBotY+hotAreaBotH)) 
  ){
  imageNumber=(nImages-1)*(r*(hotAreaBotY+hotAreaBotH)-touchY)/(r*hotAreaBotH);
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
