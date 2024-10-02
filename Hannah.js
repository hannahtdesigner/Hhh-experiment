const totLetters = 400;
const letterTypes = 8;
const letters = [];
const images = [];
const maxDist = 100;
let helloImage;

let helloW;
let helloH;
let aspect = 0;


function preload(){
   helloImage = loadImage('./images/hello.png');
   for(let i = 0 ;i < letterTypes;i++){
    images[i] = loadImage('./images/Website_h_0' + (i + 1) + '.png');
  }
}

function setup() {
  
    
  createCanvas(window.windowWidth , window.windowHeight);
  angleMode(DEGREES);
  
  
    if(windowHeight < windowWidth)
      aspect = window.windowHeight / window.windowWidth ;
    else
     aspect = window.windowWidth / window.windowHeight * 0.7 ;
     
   //aspect *= 0.6;
     
   helloW = helloImage.width * aspect;
   helloH = helloImage.height * aspect;
 
  for(let i = 0 ;i < totLetters;i++){
    letters[i] = new Letter(images[Math.round(random(0,images.length - 1))]);
  }
  
}


function clamp(val , min,max){

  if(val < min)
    return min;
  else if(val > max)
    return max;
  return val;
    
  
}


function draw() {
  
  background(255);
  image(helloImage,width / 2 - helloW / 2,height / 2 - helloH / 2 , helloW , helloH);
  for(let i = 0 ;i < totLetters;i++){
      
    let dx = mouseX - letters[i].x;
    let dy = mouseY - letters[i].y;
    
    let dist = Math.sqrt(dx * dx + dy * dy);
    
    dist = map(clamp(dist , 0,maxDist),0,maxDist,1,0);
   
    dx *= -0.05 * dist;
    dy *= -0.05 * dist;
    
    if(mouseIsPressed)
      letters[i].addForce({x:dx , y:dy});
    
    letters[i].update();
  }
  

}
