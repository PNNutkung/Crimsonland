var Player = cc.Sprite.extend({
	_currentRotation:0,
    speed:220,
	ctor: function( x, y ) {
        this._super();
        this.initWithFile( 'res/images/player.png' );
        this.x = x;
        this.y = y;
        this.setTag = "player";
        this.setAnchorPoint(cc.p(0.5,0.5));
        this.direction = Player.DIR.STILL;
    },
    setDirection: function( dir ) {
        this.direction = dir;
    },
    update: function( dt ) {
        if ((CL.KEYS[cc.KEY.w]) && this.y <= screenHeight) {
            this.y += dt * this.speed;
        }
        if ((CL.KEYS[cc.KEY.s]) && this.y >= 0) {
            this.y -= dt * this.speed;
        }
        if ((CL.KEYS[cc.KEY.a]) && this.x >= 0) {
            this.x -= dt * this.speed;
        }
        if ((CL.KEYS[cc.KEY.d]) && this.x <= screenWidth) {
            this.x += dt * this.speed;
        }
        if(CL.KEYS[cc.KEY.left]){
            this._currentRotation-= 8;
        }   
        else if(CL.KEYS[cc.KEY.right]){
            this._currentRotation+= 8;
        }

        if(this._currentRotation < 0) this._currentRotation = 360;
        if(this._currentRotation > 360) this._currentRotation = 0;
        
        this.setRotation(this._currentRotation);
        this.updatePosition();
    },
    updatePosition: function() {
        this.setPosition( cc.p( this.x, this.y ) );
    }

});

Player.MOVE_STEP = 9;
Player.DIR = {
    LEFT: 1,
    RIGHT: 2,
    UP: 3,
    DOWN: 4,
    STILL: 0
};