var Bullet = cc.Sprite.extend({
	active:true,
    xVelocity: 290,
    yVelocity: 290,
    power:1,
    HP:1,
    moveType:null,
    player:3000,
    parentType:CL.BULLET_TYPE.PLAYER,
    ctor:function (bulletSpeed, weaponType, attackMode, angle) {
        this._super("#"+weaponType);

        this.xVelocity = -bulletSpeed * Math.sin(angle);
        this.yVelocity = -bulletSpeed * Math.sin(angle);
        this.attackMode = attackMode;
        //this.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
    },
    update:function (dt) {
        var x = this.x, y = this.y;
        this.x = x - this.xVelocity * dt;
	    this.y = y - this.yVelocity * dt;
        if (x < 0 || x > g_sharedGameLayer.screenRect.width || y < 0 || y > g_sharedGameLayer.screenRect.height || this.HP <= 0) {
            this.destroy();
        }
    },
    collideRect:function (x, y) {
        return cc.rect(x - 3, y - 3, 6, 6);
    }
});

Bullet.getOrCreateBullet = function (bulletSpeed, weaponType, attackMode, player, mode) {
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
    selChild = Bullet.create(bulletSpeed, weaponType, attackMode, player, mode);
    return selChild;
};

Bullet.create = function (bulletSpeed, weaponType, attackMode, player, mode) {
    var bullet = new Bullet(bulletSpeed, weaponType, attackMode);
    g_sharedGameLayer.addBullet(bullet, player, mode);
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