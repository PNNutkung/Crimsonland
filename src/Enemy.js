var Enemy = cc.Sprite.extend({
	ctor:function(layer){
		this._super();
		this.initWithFile('res/images/enemy.png');
		this.setPosition(200,300);
		this.layer = layer;
		//this.IsHit = false;
		this.scheduleUpdate();
	},

	update:function(){
		if(this.IsHit){
			console.log('hit');
			this.removeFromParent();
		}
		console.log("x : "+this.getPositionX());
		console.log('y : '+this.getPositionY());

	},

	getRect:function(){
	var spriteRect = this.getBoundingBoxToWorld();
	return cc.rect( spriteRect.x+16*Math.sin((45*Math.PI)/180),
		spriteRect.y+16*Math.cos((45*Math.PI)/180),
		(spriteRect.width/2)*Math.sqrt(2),
		(spriteRect.width/2)*Math.sqrt(2));
	},

});