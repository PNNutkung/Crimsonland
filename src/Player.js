var Player = cc.Sprite.extend({
	_currentRotation:0,
    maxBulletPowerValue:4,
    bulletTypeValue:1,
    bulletPowerValue:1,
    speed:220,
    bulletSpeed:900,
	ctor: function( x, y ) {
        this._super();
        this.initWithFile( 'res/images/player.png' );
        this.x = x;
        this.y = y;
        this.setTag = "player";
        this.setAnchorPoint(cc.p(0.5,0.5));
    },
    shoot:function (dt) {
        var a = Bullet.create(this.bulletSpeed, "W1.png", CL.ENEMY_ATTACK_MODE.NORMAL, 3000, CL.UNIT_TAG.PLAYER_BULLET, this._currentRotation);
        a.x = this.x;
        a.y = this.y;
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
        if ( CL.KEYS[cc.KEY.space]) {
            this.shoot();
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
        var angle = Math.atan2(event.getLocationX()-this.getPositionX(),event.getLocationY()-this.getPositionY());
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