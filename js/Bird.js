const Bird = function(x, y, ctx) {
	this.x = x;
	this.y = y;
	this.ctx = ctx;
	this.velY = 0;
	this.width = 90;
	this.height = 64;
	this.ticks = 0;
	this.spriteIndex = 0;
	this.dead = false;
	this.sprites = [document.getElementById('bird1'),
		document.getElementById('bird2'),
		document.getElementById('bird3')];
	var self = this;
window.addEventListener('keydown', function(e){
	if (e.keyCode === 32 && !self.dead) {
		self.velY = -16;
      }
  });
};

Bird.prototype.update = function(pipes){
	this.y += this.velY; //gravity of bird
	this.velY += 1.25;   //gravity of bird
	if (this.detectCollisions(pipes)){  //calling and updating the detect collisions function
	this.dead = true;
	}

	this.ticks++;
		if (this.ticks % 15 === 0) this.spriteIndex = (this.spriteIndex +1) % this.sprites.length;
};

Bird.prototype.render = function(){
	let renderX = - this.width/2;
	let renderY = - this.height/2;
	this.ctx.save();
	this.ctx.translate(this.x, this.y);
	let angle = Math.PI/6 * this.velY/16;
	this.ctx.rotate(angle);
	this.ctx.drawImage(this.sprites[this.spriteIndex], renderX, renderY);

	this.ctx.restore();
};

Bird.prototype.detectCollisions = function(pipes) {
  for(var i = 0; i < pipes.length; i++){
    let e = pipes[i];
    let topPipe = e.ypos <= 0;
    let x0 = e.xpos, x1 = e.xpos+e.width;
    let a2 = this.x + 44;
    let b2 = this.y;
    if (topPipe) {
      let y0 = e.ypos + e.length;
      let a0 = this.x;
      let b0 = this.y - this.height/2; //changed -2 to /2
        if (a0 > x0 && a0 < x1 && b0 < y0 ||
	         a2 > x0 && a2 < x1 && b2 < y0 ){
          return true;
        }
      }
        else{
          let y1 = e.ypos;
          let a1 = this.x;
          let b1 = this.y + this.height/2;
          if (a1 > x0 && a1 < x1 && b1 > y1 ||
	           a2 > x0 && a2 < x1 && b2 > y1)
             return true;
        }
  }
  return false;
};
