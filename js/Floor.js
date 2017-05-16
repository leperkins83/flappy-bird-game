 const Floor = function(c, ctx){
     this.c = c;
 	this.ctx = ctx;
     this.xpos = 0;
     this.ypos = c.height - 30;
     this.width = c.width;
     this.height = 50;
     this.speed = 2;
 };

 Floor.prototype.update = function() {
   //this.xpos -= this.speed;
 };

 Floor.prototype.render = function(){
 	this.ctx.save();
    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth   = 10;
    this.ctx.strokeRect(this.xpos, this.ypos, this.width, this.height);
 	this.ctx.fillStyle = '#595a5b';
 	this.ctx.fillRect(this.xpos, this.ypos, this.width, this.height);

    //context.strokeRect(10,10, 100,100);
 	this.ctx.restore();
 };
