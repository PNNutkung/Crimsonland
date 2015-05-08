var Player = cc.Sprite.extend({
    _currentRotation: 0,
    maxBulletPowerValue: 4,
    bulletTypeValue: 1,
    bulletPowerValue: 1,
    speed: 220,
    bulletSpeed: 900,
    HP: 100,
    ctor: function(x, y, layer) {
        this._super();
        this.initWithFile(res.Player_png);
        this.x = x;
        this.y = y;
        this.setTag = "player";
        this.setAnchorPoint(cc.p(0.5, 0.5));
        this.gameLayer = layer;
    },

    shoot: function(dt) {
        var a = Bullet.create(this.bulletSpeed,
            "W1.png",
            CL.ENEMY_ATTACK_MODE.NORMAL,
            3000,
            CL.UNIT_TAG.PLAYER_BULLET,
            this._currentRotation, this.gameLayer);
        a.x = this.x;
        a.y = this.y;
        cc.audioEngine.playEffect( res.body_collid_mp3 );
    },

    update: function(dt) {
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
        if (this.HP <= 0) {
            this.removeFromParent();
            this.IsHit = true;
            this.HP = 0;
            cc.audioEngine.playEffect( res.oop_mp3 );
        }
        this.setRotation(this._currentRotation);
        this.updatePosition();
    },

    handleTouchMove: function(event) {
        var angle = Math.atan2(event.getLocationX() -
            this.getPositionX(), event.getLocationY() -
            this.getPositionY());
        angle = angle * (180 / Math.PI);
        this._currentRotation = angle;
    },

    updatePosition: function() {
        this.setPosition(cc.p(this.x, this.y));
    },

    playerPosX: function() {
        return this.x;
    },

    playerPosY: function() {
        return this.y;
    },

    hurt: function() {
        this.HP--;
    },

    getHitPoints: function() {
        return this.HP;
    },

    isLive: function() {
        return this.HP > 0;
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