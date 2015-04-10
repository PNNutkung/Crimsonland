var Bullet = cc.Sprite.extend({
    active:true,
    xVelocity:0,
    yVelocity:0,
    _currentPosX:0,
    _currentPosY:0,
    power:1,
    HP:15,
    moveType:null,
    zOrder:3000,
    attackMode:CL.ENEMY_MOVE_TYPE.NORMAL,
    parentType:CL.BULLET_TYPE.PLAYER,
    _faceAngle:0,
    _shotAngle:0,
    ctor: function (bulletSpeed, weaponType, attackMode, currentRotation,layer) {
        this._super("#"+weaponType);
        this.setPosition(5000,5000);
        this.setAnchorPoint( new cc.Point( 0.5, 0.5 ) )
        this._faceAngle = currentRotation;
        this._shotAngle = -(currentRotation * (Math.PI/180)) - (90 * (Math.PI/180));

        this.xVelocity = bulletSpeed * Math.cos(this._shotAngle);
        this.yVelocity = bulletSpeed * Math.sin(this._shotAngle);

        this.gameLayer = layer;

        this.attackMode = attackMode;
    },
    update: function (dt) {
        var x = this.x, y = this.y;
        this.x = x - this.xVelocity * dt ;
		this.y = y - this.yVelocity * dt ;
        if (x < 0 || x > g_sharedGameLayer.screenRect.width || 
            y < 0 || y > g_sharedGameLayer.screenRect.height || 
            this.HP <= 0) {
            this.destroy();
        }
        this.setRotation(this._faceAngle);
        if(this.closeTo(this.gameLayer.enemy.getEnemyPosX(),
            this.gameLayer.enemy.getEnemyPosY(),
            this.getBulletPosX(),
            this.getBulletPosY()) && 
            !this.gameLayer.enemy.IsHit) {
            this.gameLayer.enemy.hurt();
            this.destroy();
        }
        this._currentPosX = this.getPositionX();
        this._currentPosY = this.getPositionY();
    },
    getBulletPosX: function(){
        return this._currentPosX;
    },
    getBulletPosY: function(){
        return this._currentPosY;
    },
    closeTo: function(enemyPosX, enemyPosY, bulletPosX, bulletPosY){
        return (Math.abs(enemyPosX - bulletPosX) < 12 && Math.abs(enemyPosY - bulletPosY) < 12 );
    },
    destroy: function () {
        var explode = HitEffect.getOrCreateHitEffect(this.x, this.y, Math.random() * 360, 0.75);
        this.active = false;
        this.visible = false;
    },
    hurt: function () {
        this.HP--;
    }
});

Bullet.getOrCreateBullet = function (bulletSpeed, weaponType, attackMode, zOrder, mode, currentRotation) {
    /**/
    var selChild = null;
        for (var j = 0; j < CL.CONTAINER.PLAYER_BULLETS.length; j++) {
            selChild = CL.CONTAINER.PLAYER_BULLETS[j];
            if (selChild.active == false) {
                selChild.visible = true;
                selChild.HP = 1;
                selChild.active = true;
                return selChild;
            }
        }
    selChild = Bullet.create(bulletSpeed, weaponType, attackMode, zOrder, mode, currentRotation);
    return selChild;
};

Bullet.create = function (bulletSpeed, weaponType, attackMode, zOrder, mode, currentRotation,layer) {
    var bullet = new Bullet(bulletSpeed, weaponType, attackMode, currentRotation,layer);
    g_sharedGameLayer.addBullet(bullet, zOrder, mode);
    CL.CONTAINER.PLAYER_BULLETS.push(bullet);
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
