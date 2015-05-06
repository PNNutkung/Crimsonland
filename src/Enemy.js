var Enemy = cc.Sprite.extend({
    _currentRotation: 0,
    _currentPosX: 0,
    _currentPosY: 0,
    HP: 15,
    ctor: function(x, y) {
        this._super();
        var sprites = ['res/images/enemy.png','res/images/enemy2.png','res/images/enemy3.png','res/images/enemy4.png'];
        var randomNum = Math.floor(Math.random()*4) ;
        this.initWithFile(sprites[randomNum]);
        this.setPosition(x, y);
        this.player = null;
        this.spottedPlayer = false;
        this.speed = Enemy.SPEED;
        this.scheduleUpdate();
    },

    update: function() {
        if (this.HP <= 0) {
            g_sharedGameLayer.scoreLabel.getScore(5);
            g_sharedGameLayer.SCORE+=5;
            this.dropItem(this._currentPosX,this._currentPosY);
            this.removeFromParent();
            this.IsHit = true;
            this.setPosition(new cc.Point(-100,-100));
        }
        this._currentPosX = this.getPositionX();
        this._currentPosY = this.getPositionY();
        this.collidsionCheck();
        this.faceToPlayer();
        this.spotPlayer();
        this.followPlayer();
        this.setRotation(this._currentRotation);
    },

    dropItem: function( posX,posY) {
        var random = Math.floor(Math.random()*10000) + 1 ;
        if ( random <= 3000 ) this.item = new potion( posX, posY );
        else if ( random <= 5000) this.item = new bomb( posX, posY );
        //else if ( random <= 70) this.item = new potion( posX, posY );
        if( this.item != null) g_sharedGameLayer.addChild( this.item );
    },

    faceToPlayer: function() {
        var angle = Math.atan2(g_sharedGameLayer.player.playerPosX() -
            this.getPositionX(), g_sharedGameLayer.player.playerPosY() -
            this.getPositionY());
        angle = angle * (180 / Math.PI);
        this._currentRotation = angle;
    },

    hurt: function() {
        this.HP -= 5;
    },

    getEnemyPosX: function() {
        return this._currentPosX;
    },

    getEnemyPosY: function() {
        return this._currentPosY;
    },

    checkPlayerQuadrant: function(player, distanceX, distanceY) {

        if (distanceX >= 0) {
            if (distanceY >= 0) {
                return Enemy.FOLLOWBYQUADRANTS.FIRSTQUADRADNT;
            } else return Enemy.FOLLOWBYQUADRANTS.FOURTHQUADRANT;
        } else {
            if (distanceY >= 0) {
                return Enemy.FOLLOWBYQUADRANTS.SECONDQUADRANT;
            } else return Enemy.FOLLOWBYQUADRANTS.THIRDQUADRANT;
        }

    },

    getDistanceXFromPlayer: function(player) {
        var playerPositionX = this.player.getPositionX();
        var distanceX = this.getPositionX() - playerPositionX;
        return distanceX;
    },

    getDistanceYFromPlayer: function(player) {
        var playerPositionY = this.player.getPositionY();
        var distanceY = this.getPositionY() - playerPositionY;
        return distanceY;
    },

    followPlayer: function() {
        if (this.spottedPlayer) {
            var distanceX = this.getDistanceXFromPlayer();
            var distanceY = this.getDistanceYFromPlayer();
            var quadrant = this.checkPlayerQuadrant(this.player, distanceX, distanceY);
            var degree = Math.atan(distanceX / distanceY);

            if (quadrant == Enemy.FOLLOWBYQUADRANTS.THIRDQUADRANT ||
                quadrant == Enemy.FOLLOWBYQUADRANTS.FOURTHQUADRANT) degree += Math.PI;
            this.moveAfterPlayer(degree);
            this.timeUntilMove = 0;
        }
    },

    moveAfterPlayer: function(degree) {
        this.x -= this.speed * Math.sin(degree);
        this.y -= this.speed * Math.cos(degree);
    },

    spotPlayer: function() {
        if (!this.spottedPlayer);
        if (Math.abs(this.x - this.player.getPositionX()) < 800 &&
            Math.abs(this.y - this.player.getPositionY()) < 600) {
            this.spottedPlayer = true;
        }
    },

    hitPlayer: function() {
        if (this.checkPlayerWithinHitRange()) {
            this.player.handleHitFromEnemy(this);
            this.speed = 0;
        }
        this.hitCooldown = Enemy.HITCOOLDOWN;
        this.speed = Enemy.SPEED;
    },

    checkPlayerWithinHitRange: function() {
        return cc.rectOverlapsRect(this.hitRange, this.player.getPlayerRect());
    },

    setKnownPlayer: function(player) {
        this.player = player;
    },

    closeTo: function(enemyPosX, enemyPosY, bulletPosX, bulletPosY) {
        return (Math.abs(enemyPosX - bulletPosX) < 12 && Math.abs(enemyPosY - bulletPosY) < 12);
    },

    collidsionCheck: function() {
        if (this.closeTo(this.player.getPositionX(),
            this.player.getPositionY(),
            this.getPositionX(),
            this.getPositionY()) &&
            !this.player.IsHit) {
            this.player.hurt();
        }
    }
});

Enemy.SPEED = 3.25;
Enemy.MOVEAFTERTWOSECONDS = 2;
Enemy.FOLLOWBYQUADRANTS = {
    FIRSTQUADRADNT: 1,
    SECONDQUADRANT: 2,
    THIRDQUADRANT: 3,
    FOURTHQUADRANT: 4
};