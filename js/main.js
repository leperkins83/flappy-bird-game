window.onload = function(){
   const c = document.getElementById('canvas');
   c.width = window.innerWidth;
   c.height = 600;

   const ctx = c.getContext('2d');

   const environment = new Environment(c, ctx);
   const bird = new Bird(250, 300, ctx);
   const pipes = [];
   let pipeSet = generateRandomPipes(ctx, c.width, c.height);
   pipes.push(pipeSet.top, pipeSet.bottom);
   setInterval(function(){
       let pipeSet = generateRandomPipes(ctx, c.width, c.height);
       pipes.push(pipeSet.top, pipeSet.bottom);
       //console.log('pipes');
   }, 2400);
   gameLoop();



  //  MAIN GAME LOOP
  function gameLoop(){
     //ctx.fillRect(0, 0, c.width, c.height);
     bird.update(pipes);
     if(!bird.dead) {
     environment.update();

     pipes.forEach(function(pipe1){
       pipe1.update();
     });
     }
     environment.render();
     pipes.forEach(function(pipe1){
       pipe1.render();
     });
     bird.render();
     if(bird.dead) {
	      drawGameOver(ctx, c);
     	//return;  //THIS RETURN WILL FREEZE THE GAME WHEN YOU DIE, KEEP FOR NOW!!
     }
     window.requestAnimationFrame(gameLoop);
   }
};

function generateRandomPipes(ctx, canvasWidth, canvasHeight){
  let lengthTop = Math.round(Math.random()*200+50);
  let lengthBottom = canvasHeight - 300 - lengthTop;
  let returnVal = { };
  returnVal.top = new Pipe(canvasWidth, -5, lengthTop, 3, ctx);
  returnVal.bottom = new Pipe(canvasWidth, canvasHeight+5-lengthBottom, lengthBottom, 3, ctx);
  return returnVal;
}

function drawGameOver(ctx, c){
	ctx.font = "50px Impact";
	ctx.textAlign = 'center';
	ctx.fillText('GAME OVER!', c.width/2, c.height/2);
}