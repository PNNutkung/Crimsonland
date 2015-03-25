/*var Bullet = cc.Sprite.extend({
	ctor: function( layer ){
		this._super();

		this.x = layer.player;
		this.y = y;
		this.initWithFile("res/images/bullet.png");
	},
	update: function(){
		this.bullet.x += bulletSpeedX;
        this.bullet.y += bulletSpeedY;
	}
});

Bullet.create = function (bulletSpeed) {
    var bullet = new Bullet(bulletSpeed);
    GameLayer.addBullet(bullet);
    if (mode == CL.UNIT_TAG.PLAYER_BULLET) {
        CL.CONTAINER.PLAYER_BULLETS.push(bullet);
    } else {
        CL.CONTAINER.ENEMY_BULLETS.push(bullet);
    }
    return bullet;
};*/

var Bullet = cc.Sprite.extend({
    active:true,
    xVelocity:200,
    yVelocity:200,
    power:1,
    HP:1,
    moveType:null,
    zOrder:3000,
    attackMode:CL.ENEMY_MOVE_TYPE.NORMAL,
    parentType:CL.BULLET_TYPE.PLAYER,
    _faceAngle:0,
    ctor:function (bulletSpeed, weaponType, attackMode, currentRotation) {
        this._super("#"+weaponType);
        this.xVelocity = -bulletSpeed * Math.sin(currentRotation);
        this.yVelocity = -bulletSpeed * Math.cos(currentRotation);
        this._faceAngle = currentRotation;
        this.attackMode = attackMode;
        console.log( "parse : " + currentRotation );
        //this.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
    },
    update:function (dt) {
        var x = this.x, y = this.y;
        this.x = x - this.xVelocity * dt * Math.sin(this._faceAngle);
	    this.y = y - this.yVelocity * dt * Math.cos(this._faceAngle);
        if (x < 0 || x > g_sharedGameLayer.screenRect.width || y < 0 || y > g_sharedGameLayer.screenRect.height || this.HP <= 0) {
            this.destroy();
        }
        this.scheduleUpdate();
    },
    destroy:function () {
        var explode = HitEffect.getOrCreateHitEffect(this.x, this.y, Math.random() * 360, 0.75);
        this.active = false;
        this.visible = false;
    },
    hurt:function () {
        this.HP--;
    },
    collideRect:function (x, y) {
        return cc.rect(x - 3, y - 3, 6, 6);
    }
});

Bullet.getOrCreateBullet = function (bulletSpeed, weaponType, attackMode, zOrder, mode, currentRotation) {
    /**/
    var selChild = null;
    if (mode == CL.UNIT_TAG.PLAYER_BULLET) {
        for (var j = 0; j < CL.CONTAINER.PLAYER_BULLETS.length; j++) {
            selChild = CL.CONTAINER.PLAYER_BULLETS[j];
            if (selChild.active == false) {
                selChild.visible = true;
                selChild.HP = 1;
                selChild.active = true;
                return selChild;
            }
        }
    }
    else {
        for (var j = 0; j < CL.CONTAINER.ENEMY_BULLETS.length; j++) {
            selChild = CL.CONTAINER.ENEMY_BULLETS[j];
            if (selChild.active == false) {
                selChild.visible = true;
                selChild.HP = 1;
                selChild.active = true;
                return selChild;
            }
        }
    }
    selChild = Bullet.create(bulletSpeed, weaponType, attackMode, zOrder, mode, currentRotation);
    return selChild;
};

Bullet.create = function (bulletSpeed, weaponType, attackMode, zOrder, mode, currentRotation) {
    var bullet = new Bullet(bulletSpeed, weaponType, attackMode, currentRotation);
    g_sharedGameLayer.addBullet(bullet, zOrder, mode);
    if (mode == CL.UNIT_TAG.PLAYER_BULLET) {
        CL.CONTAINER.PLAYER_BULLETS.push(bullet);
    } else {
        CL.CONTAINER.ENEMY_BULLETS.push(bullet);
    }
    return bullet;
};

Bullet.preSet = function () {
    var bullet = null;
    for (var i = 0; i < 10; i++) {
        var bullet = Bullet.create(CL.BULLET_SPEED.SHIP, "W1.png", CL.ENEMY_ATTACK_MODE.NORMAL, 3000, CL.UNIT_TAG.PLAYER_BULLET);
        bullet.visible = false;
        bullet.active = false;
    }
};
