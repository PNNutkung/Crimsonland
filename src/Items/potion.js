var potion = Item.extend({
	ctor: function( x, y ) {
		this._super( x,y );
		this.init();
		this.scheduleUpdate();
	},

	init: function() {
		this.initWithFile(res.potion_png);
	},

	effect: function() {
		if ( this.isHit() ) {
			this.removeFromParent();
			g_sharedGameLayer.player.HP += 10;
			if(g_sharedGameLayer.player.HP > 100) g_sharedGameLayer.player.HP = 100;
		}
	}


});