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
    shoot:function (dt) {
        var offset = 27;
        var a = Bullet.getOrCreateBullet(this.bulletSpeed, "W1.png", CL.ENEMY_ATTACK_MODE.NORMAL, 3000, CL.UNIT_TAG.PLAYER_BULLET);
        a.x = this.x + offset;
        a.y = this.y + 3 + this.height * 0.3;

        var b = Bullet.getOrCreateBullet(this.bulletSpeed, "W1.png", CL.ENEMY_ATTACK_MODE.NORMAL, 3000, CL.UNIT_TAG.PLAYER_BULLET);
        b.x = this.x - offset;
        b.y = this.y + 3 + this.height * 0.3;
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
        
        this.setRotation(this._currentRotation);
        this.updatePosition();
    },
    handleTouchMove: function(event){
        var angle = Math.atan2(parseInt(event.getLocationX())-300,parseInt(event.getLocationY())-300);
        angle = angle * (180/Math.PI);
        this._currentRotation = angle;
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