var Enemy = cc.Sprite.extend({
    _currentPosX: 0,
    _currentPosY: 0,
    HP: 15,
    timeUntilMove: 2,
    ctor: function(x, y) {
        this._super();
        this.initWithFile('res/images/enemy.png');
        this.setPosition(x, y);
        this.player = null;
        this.spottedPlayer = false;
        this.speed = Enemy.SPEED;
        this.scheduleUpdate();
    },

    update: function() {
        if (this.HP <= 0) {
            g_sharedGameLayer.scoreLabel.getScore(5);
            this.removeFromParent();
            this.IsHit = true;
        }
        this._currentPosX = this.getPositionX();
        this._currentPosY = this.getPositionY();
        this.collidsionCheck();
        this.spotPlayer();
        this.followPlayer();
    },

    hurt: function() {
        this.HP -= 3;
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