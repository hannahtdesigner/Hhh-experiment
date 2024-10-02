class Letter{

  image;
  x;
  y;
  imgSize;
  speed = {x:0,y:0}
  accell = {x:0,y:0}
  friction = 0.95;
  angle;
  
  constructor(img){
    this.image = img;
    this.x = random(0,width);
    this.y = random(0,height);
    this.imgSize = height > width ? height * 0.05 : width * 0.05;
    this.angle = random(0,360);
    
    
  }
  
  addForce(f){
    this.accell.x += f.x;
    this.accell.y += f.y;
  }
  
  
  update(){
    
    
    
    this.speed.x += this.accell.x;
    this.speed.y += this.accell.y;
    this.x += this.speed.x;
    this.y += this.speed.y;
    push();
    
    translate(this.x,this.y );
    rotate(this.angle);
    image(this.image, - this.imgSize / 2,- this.imgSize /2,this.imgSize,this.imgSize);
    pop();
    
    this.speed.x *= this.friction;
    this.speed.y *= this.friction;
    
    this.accell.x = 0;
    this.accell.y = 0;
    
    this.updateBounds();
  }
  
  updateBounds(){
    if(this.x > width)
      this.x = 0;
    else if(this.x < 0)
      this.x = width;
      
    if(this.y > height)
      this.y = 0;
    else if(this.y < 0)
      this.y = height;
  
  }

}
