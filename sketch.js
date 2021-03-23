let obsarray = [] ;
let bc = 255;

function getRandom(c){return Math.floor(Math.random()*c);}
r = getRandom(255);
g = getRandom(255);
b = getRandom(255);
//滑鼠點擊時邊框顏色變更
function mouseClicked() {
  r = getRandom(255);
  g = getRandom(255);
  b = getRandom(255);
}

//規則說明
function ruuuuule(){
  alert("滑鼠左鍵→變換邊框顏色");
  alert("滑鼠移至主體上可放大、加速");
  alert("拉桿變更主體形狀");
  alert("衛星顏色隨滑鼠座標變更");
  alert("滑鼠滾輪變更背景顏色");
}
//重置
function reeeeee(){
  location.reload();
}

function teeee(){
  
  }

function setup() {
  createCanvas(400, 400, WEBGL);
  for(let i = 0; i<5; i += 1){
    obsarray.push(new myBox());
  }
  detailX = createSlider(3, 24, 3);
  detailX.position(10, height + 5);
  detailX.style('width', '80px');
}
                             
function draw() {
  background(bc);
  lights();
  obsarray.forEach((v) => {v.display();});

}

function mouseWheel(event) {
  //bc += event.delta;
  if(event.delta > 0){
    bc = bc + 10;
    }
  if (event.delta < 0) {
    bc = bc - 10;
  }
}

/*function mouseDragged() {
  bc = bc - 5;
  if (bc < 0) {
    bc = 255;
  }
} */

class myBox{
  constructor(x = random(width)-width/2,y = random(height)-height/2,z,size = random(30,50)){
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
    this.mx = 1.5
    this.my = 1.3
    this.cc = color(random(255),random(255),random(255));
    this.rx = (random(0.03,0.07));
    this.ry = (random(0.03,0.07));
    this.rz = (random(0.03,0.07));
    this.stela = new stela(this.x,this.y,this.z,this.size*0.25,this.size);
    this.stela2 = new stela2(this.x,this.y,this.z,this.size*0.25,this.size*2);
    this.stela3 = new stela3(this.x,this.y,this.z,this.size*0.25,this.size*2.7);
    this.stela4 = new stela4(this.x,this.y,this.z,this.size*0.25,this.size*3.5);
  }
    
  display(){
    push();
    translate(this.x,this.y);
    //滑鼠於範圍內時方塊放大並加速
    if(mouseX-width/2 > this.x-this.size/2 &&
       mouseX-width/2 < this.x+this.size/2 &&
       mouseY-height/2 > this.y-this.size/2 &&
       mouseY-height/2 < this.y+this.size/2 ){
      this.size = this.size + 2;
      if(this.mx>0){this.mx = this.mx + 0.2;}
      if(this.mx<0){this.mx = this.mx - 0.2;}
      if(this.my>0){this.my = this.my + 0.3;}
      if(this.my<0){this.my = this.my - 0.3;}
    }
    this.stela.display();
    this.stela2.display();
    this.stela3.display();
    this.stela4.display();
    rotateZ(frameCount*this.rz);
    rotateY(frameCount*this.ry);
    rotateX(frameCount*this.rx);
    //translate(this.x,this.y,this.z);
    stroke(r,g,b);
    fill(this.cc);
    torus(this.size,this.size*0.5, detailX.value());
    //移動、觸碰邊緣反彈與變色
    if(this.x>width/2){
      this.mx = -1.3;
      this.cc = color(random(255),random(255),random(255));}
    if(this.x<-width/2){
      this.mx = 1.3;
      this.cc = color(random(255),random(255),random(255));}
    this.x = this.x+this.mx;
    if(this.y>height/2){
      this.my = -1.5;
      this.cc = color(random(255),random(255),random(255));}
    if(this.y<-height/2){
      this.my = 1.5;      
      this.cc = color(random(255),random(255),random(255));}
    this.y = this.y+this.my;
    pop();
  }
}
//衛星一號 球
class stela{
  constructor(x,y,z,size,cdx){
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
    this.cdx = cdx;
  }
  display(){
    push();
    rotateZ(frameCount*0.05);
    translate(this.cdx,0,0);
    fill(150,mouseY,mouseX);
　  noStroke();
    sphere(this.size);
    pop();
  }
}
//衛星二號 圓錐
class stela2{
  constructor(x,y,z,size,cdx){
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
    this.cdx = cdx;
  }
  display(){
    push();
    rotateY(frameCount*-0.02);
    rotateZ(frameCount*-0.02);
    translate(this.cdx,0,0);
    fill(mouseY,150,mouseX);
　  noStroke();
    cone(this.size,this.size*1.3);
    pop();
  }
}
//衛星三號 環狀
class stela3{
  constructor(x,y,z,size,cdx){
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
    this.cdx = cdx;
  }
  display(){
    push();
    rotateX(frameCount*-0.04);
    rotateZ(frameCount*-0.04);
    translate(this.cdx,0,0);
    fill(mouseX,mouseY,150);
　  noStroke();
    torus(this.size,this.size*0.5);
    pop();
  }
}
//衛星四號 圓柱體
class stela4{
  constructor(x,y,z,size,cdx){
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
    this.cdx = cdx;
  }
  display(){
    push();
    rotateZ(frameCount*-0.06);
    translate(this.cdx,0,0);
    fill(mouseX,mouseX,mouseY);
　  noStroke();
    cylinder(this.size,this.size*1.3);
    pop();
  }
}