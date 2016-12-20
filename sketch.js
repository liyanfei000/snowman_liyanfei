function setup() {
  createCanvas(360,640);
  
  //Deal with microphone
  mic = new p5.AudioIn();
  mic.start();
}

var snowflakes = []

function preload(){
     socks = loadImage("images/socks.png");
     snowman = loadImage("images/snowman.png");
    snowland = loadImage("images/snowland.png");
    tree = loadImage("images/tree.png");
    words = loadImage("images/words.png");
}

function draw() {
    
  
  var volume = mic.getLevel();
  
  //If the volume is not enought, re-map it (set a higher newMax).
  var newMax = 5;
  volume = map(volume,0,1,0,newMax);

    
  background(196,230,255);
  imageMode(CENTER)
  image(snowland,180,550,snowland.width/4, snowland.height/4);
  var x = 300;
  var x = map(volume,0,1,340,280);
    
  push();
  imageMode(CENTER)
  image(snowman,175,x,snowman.width/3, snowman.height/3);
  pop();
  push();  //Start with transformations
  var size = map(volume,0,1,1,20);
    noStroke();
    fill(0);
  ellipse(177,x-32,size,size+2);
  pop();  //All transformation are now dropped and the coordinate system is resetted.
    
  imageMode(CENTER)
  image(socks,185,410,socks.width/3, socks.height/3);
  image(tree,80,360,tree.width/3, tree.height/3); 
  image(tree,25,390,tree.width/4, tree.height/4);
  image(tree,330,360,tree.width/4, tree.height/4); 
  image(tree,280,370,tree.width/3, tree.height/3);
  image(words,180,100,words.width/4, words.height/4);
    
//SNOWFLAKES
  if(true){
    var amount= map(volume,0,1,0,5);
    for(i=1; i <= amount; i++) {
      var obj = {
        x: random(0,1),
        y: random(0,-height/10),
        size: random(1, amount+2)
      }
      //add snowflake to the array of snowflakes
      snowflakes.push(obj);
    }
  }
  
  
  for(var i=0; i< snowflakes.length; i++) {
    var fallingSpeed = 1;
    
    // Increase the single snowflake vertical position
    snowflakes[i].y += fallingSpeed + snowflakes[i].y*0.006; // the last piece needs to simulate gravity
    
    // Create a new ellipse using the x and y properties of the snowflake object
    fill(235,235,188)
    noStroke();
    fill(255);
    ellipse(snowflakes[i].x*width, snowflakes[i].y, snowflakes[i].size);
  }
  
  // Ideally at the end of the sketch:
  // remove elements from array when they go out of the window
  // (not a minimum requirement, just useful for better performances)
  for (var i=snowflakes.length-1; i>= 0; i--){
    if (snowflakes[i].y > height){
      snowflakes.splice(i,1);
    }
  }
    
  
}