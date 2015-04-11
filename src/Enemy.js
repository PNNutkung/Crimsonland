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
	},
	checkPlayerQuadrant: function( player, distanceX, distanceY ) {

		if( distanceX >= 0 ) {
			if( distanceY >= 0 ) {
				return enemy.FOLLOWBYQUADRANTS.FIRSTQUADRADNT;
			} else return enemy.FOLLOWBYQUADRANTS.FOURTHQUADRANT;
		} else {
			if( distanceY >= 0 ) {
				return enemy.FOLLOWBYQUADRANTS.SECONDQUADRANT;
			} else return enemy.FOLLOWBYQUADRANTS.THIRDQUADRANT;
		}

	},

	getDistanceXFromPlayer: function( player ) {
		var playerPositionX = this.player.getPositionX();
		var distanceX = this.getPositionX() - playerPositionX;
		return distanceX;
	},

	getDistanceYFromPlayer: function( player ) {
		var playerPositionY = this.player.getPositionY();
		var distanceY = this.getPositionY() - playerPositionY;
		return distanceY;
	},

	followPlayer: function() {
		if( this.spottedPlayer ) {
			if( this.timeUntilMove > 0.5 ) {
				var distanceX = this.getDistanceXFromPlayer();
				var distanceY = this.getDistanceYFromPlayer();
				var quadrant = this.checkPlayerQuadrant( this.player, distanceX, distanceY );
				var degree = Math.atan( distanceX / distanceY );

				if( quadrant == enemy.FOLLOWBYQUADRANTS.THIRDQUADRANT || quadrant == enemy.FOLLOWBYQUADRANTS.FOURTHQUADRANT ) degree += Math.PI;
				this.moveAfterPlayer( degree );
				this.timeUntilMove = 0;
			}
		}
	},

	moveAfterPlayer: function( degree ) {
		this.x -= enemy.SPEED * Math.sin( degree );
		this.y -= enemy.SPEED * Math.cos( degree );
	}
});
enemy.FOLLOWBYQUADRANTS = {
	FIRSTQUADRADNT:1,
	SECONDQUADRANT:2,
	THIRDQUADRANT:3,
	FOURTHQUADRANT:4
}
