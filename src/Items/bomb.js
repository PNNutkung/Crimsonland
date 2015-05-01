var bomb = Item.extend({
	ctor: function( x, y ) {
		this._super(x,y);
		this.init();
		this.scheduleUpdate();
	},

	init: function() {
		this.initWithFile(res.bomb_png);
	},

	enemyInRange: function( enemy ) {
        return Math.abs(this.getPositionX() - enemy.getEnemyPosX() ) <= 100 &&
               Math.abs(this.getPositionY() - enemy.getEnemyPosY() ) <= 100;
    },

	effect: function() {
		if( this.isHit() ) {
				for (var j = 0; j < CL.CONTAINER.ENEMIES.length; j++) {
	            	selEnemy = CL.CONTAINER.ENEMIES[j];
	            	if ( this.enemyInRange( selEnemy ) ) {
		                selEnemy.removeFromParent();
		                g_sharedGameLayer.scoreLabel.getScore(100);
		                g_sharedGameLayer.SCORE+=100;
		            }
	            }
	            this.removeFromParent();
	        }
    	}


});