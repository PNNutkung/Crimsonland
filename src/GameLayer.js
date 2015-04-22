var g_sharedGameLayer;

var GameLayer = cc.LayerColor.extend({
    screenRect: null,
    _texOpaqueBatch: null,
    init: function() {
        cc.spriteFrameCache.addSpriteFrames(res.textureOpaquePack_plist);
        this.addKeyboardHandlers();
        this.addMouseHandlers();

        var texOpaque = cc.textureCache.addImage(res.textureOpaquePack_png);
        this._texOpaqueBatch = new cc.SpriteBatchNode(texOpaque);
        this._sparkBatch = new cc.SpriteBatchNode(texOpaque);

        if (cc.sys.isNative) this._sparkBatch.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
        this.addChild(this._texOpaqueBatch);
        this.addChild(this._sparkBatch);

        this.screenRect = cc.rect(0, 0, screenWidth, screenHeight + 10);

        g_sharedGameLayer = this;

        Bullet.preSet();
        HitEffect.preSet();

        CL.CONTAINER.PLAYER_BULLETS = [];
        CL.CONTAINER.HITS = [];
        CL.CONTAINER.ENEMIES = [];

        this.addPlayer();
        this.player.scheduleUpdate();

        this.addLifeLabel();
        this.addScoreLabel();

        this.scheduleUpdate();
        return true;
    },

    update: function(dt) {
        this.lifeLabel.getHit();
        this.count += dt;
        this.removeInactiveUnit(dt);
        if (this.count > 0.4) {
            this.spawnEnemy();
            this.count = 0;
        }
    },
    addPlayer: function() {
        var self = this;
        self.player = new Player(400, 300, self);
        self.addChild(self.player);
    },

    addLifeLabel: function() {
        var self = this;
        self.lifeLabel = new lifeLabel();
        self.lifeLabel.setKnownPlayer(self.player);
        self.addChild(self.lifeLabel);
        self.count = 0;
    },

    addScoreLabel: function() {
        var self = this;
        self.scoreLabel = new scoreLabel();
        self.addChild(self.scoreLabel);
    },

    spawnEnemy: function() {
        var xPos = Math.floor(Math.random() * 800 + 1);
        var yPos = Math.floor(Math.random() * 600 + 1);
        if (Math.abs(xPos - this.player.playerPosX()) >= 50 && Math.abs(yPos - this.player.playerPosY()) >= 50) {
            this.enemy = new Enemy(xPos, yPos);
            this.addChild(this.enemy);
            this.enemy.scheduleUpdate();
            this.enemy.setKnownPlayer(this.player);
            CL.CONTAINER.ENEMIES.push(this.enemy);
        }
    },

    removeInactiveUnit: function(dt) {
        var i, selChild, children = this._texOpaqueBatch.children;
        for (i in children) {
            selChild = children[i];
            if (selChild && selChild.active)
                selChild.update(dt);
        }
    },

    addKeyboardHandlers: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                CL.KEYS[keyCode] = true;
            },
            onKeyReleased: function(keyCode, event) {
                CL.KEYS[keyCode] = false;
            }
        }, this);
    },

    addMouseHandlers: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseMove: function(event) {
                self.player.handleTouchMove(event);
            },
            onMouseDown: function(event) {
                var str = "Mouse Down detected, Key: " + event.getButton();
                console.log(str);
                if (event.getButton() == 0 && self.player.isLive() ) {
                    self.player.shoot();
                }
            },
            onMouseUp: function(event) {

            }
        }, this);
    }
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
    }

});

GameLayer.prototype.addBullet = function(bullet) {
    this._texOpaqueBatch.addChild(bullet);
};

GameLayer.prototype.addBulletHits = function(hit, zOrder) {
    this._texOpaqueBatch.addChild(hit, zOrder);
};