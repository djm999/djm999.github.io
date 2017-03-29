var imgWidth=1920;
var imageNumber1, imageNumber2;
var n;
var direction = 'squeeze';

//mapping hot areas for squeezing
var hotArea1LeftW=173, hotArea1LeftH=100, hotArea1LeftX=720, hotArea1LeftY=514;
var hotArea1RightW=155, hotArea1RightH=100, hotArea1RightX=1020, hotArea1RightY=514;

//mapping hot areas for squeezing
var hotArea2LeftW=175, hotArea2LeftH=100, hotArea2LeftX=433, hotArea2LeftY=514;
var hotArea2RightW=175, hotArea2RightH=100, hotArea2RightX=1320, hotArea2RightY=514;

var r;

var start1=1;
var finish1=22;

var start2=1;
var finish2=47;

var nImages1=finish1-start1;
var nImages2=finish2-start2;
var imgs1 = [];
var imgs2 = [];

//interaction cues 
var xl=hotArea1LeftX,yl=(hotArea1LeftY+hotArea1LeftH/2),xr=(hotArea1RightX+hotArea1RightW),yr=(hotArea1RightY+hotArea1RightH/2);
var anim=60;
var c;

function preload(){
 for (var i = start1; i<(finish1+1); i++) {
    imgs1[i-start1]=loadImage("newimage1/fabric1_"+str(i)+".jpg");
  } 
  for (var j = start2; j<(finish2+1); j++) {
    imgs2[j-start2]=loadImage("newimage2/fabric2_"+str(j)+".jpg");
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

  if (direction === 'squeeze'){
    if (down === false){
      if (imageNumber1>1){
        imageNumber1-=2;
      }
      else {
        imageNumber1=0;
      }
      c=color('rgba(255,255,255,0.5)');
    }
    println(imageNumber1);
    n=ceil(imageNumber1);
    image(imgs1[n], 0, 0,imgWidth*r,imgWidth*r*9/16);
  }
  
  if (direction === 'stretch'){
    if (down === false){
      if (imageNumber2>2){
        imageNumber2-=3;
      }
      else {
        imageNumber2=0;
      }
      c=color('rgba(255,255,255,0.5)');
    }
    println(imageNumber2);
    n=ceil(imageNumber2);
    image(imgs2[n], 0, 0,imgWidth*r,imgWidth*r*9/16);
  }
  
  // fill(c);
  // noStroke();
  // ellipse(xl*r,yl*r,40*r,40*r);
  // ellipse(xr*r,yr*r,40*r,40*r);
  
  // xl=xl+1;
  // xr=xr-1;
  // if (xl>(hotArea1LeftX+anim)) {
  //   xl=hotArea1LeftX;
  // }
  // if (xr<(hotArea1RightX+hotArea1RightW-anim)) {
  //   xr=(hotArea1RightX+hotArea1RightW);
  // }
}

function touchMoved(){
  if ((touchX>r*hotArea1LeftX) && (touchX<r*(hotArea1LeftX+hotArea1LeftW)) && (touchY>r*hotArea1LeftY) && (touchY<r*(hotArea1LeftY+hotArea1LeftH)) 
  ){
      direction = 'squeeze';
      imageNumber1=(nImages1-1)*((touchX)-r*hotArea1LeftX)/(r*hotArea1LeftW);
      c=color('rgba(255,255,255,0)');
  }
  if ((touchX>r*hotArea1RightX) && (touchX<r*(hotArea1RightX+hotArea1RightW)) && (touchY>r*hotArea1RightY) && (touchY<r*(hotArea1RightY+hotArea1RightH)) 
  ){
    direction = 'squeeze';
    imageNumber1=(nImages1-1)*(r*(hotArea1RightX+hotArea1RightW)-touchX)/(r*hotArea1RightW);
    c=color('rgba(255,255,255,0)');
  }
  
  if ((touchX>r*hotArea2LeftX) && (touchX<r*(hotArea2LeftX+hotArea2LeftW)) && (touchY>r*hotArea2LeftY) && (touchY<r*(hotArea2LeftY+hotArea2LeftH)) 
  ){
      direction = 'stretch';
      imageNumber2=(nImages2-1)*(r*(hotArea2LeftX+hotArea2LeftW)-touchX)/(r*hotArea2LeftW);
      c=color('rgba(255,255,255,0)');
  }
  if ((touchX>r*hotArea2RightX) && (touchX<r*(hotArea2RightX+hotArea2RightW)) && (touchY>r*hotArea2RightY) && (touchY<r*(hotArea2RightY+hotArea2RightH)) 
  ){
    direction = 'stretch';
    imageNumber2=(nImages2-1)*(touchX-r*hotArea2RightX)/(r*hotArea2RightW);
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