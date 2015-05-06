var bomb = Item.extend({
	posX:0,
	posY:0,
	ctor: function( x, y ) {
		this._super(x,y);
		this.init();
		this.scheduleUpdate();
		this.boom = null;

	},

	init: function() {
		this.initWithFile(res.bomb_png);
	},

	enemyInRange: function( enemy ) {
        return Math.abs(this.getPositionX() - enemy.getEnemyPosX() ) <= 150 &&
               Math.abs(this.getPositionY() - enemy.getEnemyPosY() ) <= 150;
    },

	effect: function() {
		if( this.isHit() ) {
			this.removeFromParent();
			this.boom = new Boom(this.getPositionX(),this.getPositionY());
			this.boom.isHitBomb = true;
			g_sharedGameLayer.addChild( this.boom );
				for (var runLoop = 0; runLoop < CL.CONTAINER.ENEMIES.length; runLoop++) {
	            	selEnemy = CL.CONTAINER.ENEMIES[runLoop];
	            	if ( this.enemyInRange( selEnemy ) ) {
		                selEnemy.setPosition(new cc.Point(-100,-100));
		                for(var hp = 0;hp <= 10;hp++ ){
		                	selEnemy.hurt();
		                }
		                g_sharedGameLayer.scoreLabel.getScore(50);
		                g_sharedGameLayer.SCORE+=50;
		            }
	            }
	        }
    	}


});