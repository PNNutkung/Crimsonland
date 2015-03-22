var Player = cc.Sprite.extend({
	ctor: function( x, y ) {
        this._super();
        this.initWithFile( 'res/images/player.png' );
        this.x = x;
        this.y = y;
    }

});

Player.MOVE_STEP = 5;