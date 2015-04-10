var Enemy = cc.Sprite.extend({
	_currentPosX:0,
	_currentPosY:0,
	HP:15,
	ctor:function(layer){
		this._super();
		this.initWithFile('res/images/enemy.png');
		this.setPosition(500,300);
		this.layer = layer;
		this.scheduleUpdate();
	},
	update:function(){
		if( this.HP <= 0 ){
			console.log('hit');
			this.removeFromParent();
			this.IsHit = true;
		}
		this._currentPosX = this.getPositionX();
		this._currentPosY = this.getPositionY();
	},
	hurt: function(){
		this.HP--;
	},
	getEnemyPosX: function(){
		return this._currentPosX;
	},
	getEnemyPosY: function(){
		return this._currentPosY;
	}
});