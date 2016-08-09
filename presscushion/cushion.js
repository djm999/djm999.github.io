
var imgs = new Array();
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

window.onload = function(){ //function preloadImages(){
  for ( i=1; i<44;i++){
    imgs[i-1] = new Image();
    var n=String(i);
    imgs[i-1].src=("img/pcushion_"+n+".jpg");        
  }
  imgs[0].onload=function(){
    context.drawImage(imgs[0],0,0);
    context.fillStyle = "black";
    context.font = "30px Arial";
    context.textAlign = "center";
    context.fillText("On 3D touch devices: press the cushion with different forces.",512,60);
  }
}

Pressure.set('#myCanvas', {
  change: function(force, event){
    var m=Math.ceil(43*force);
    var n=String(m);
    context.drawImage(imgs[m],0,0);
  },

  end: function(){
    context.drawImage(imgs[0],0,0);
  },

}, {polyfill: true});

