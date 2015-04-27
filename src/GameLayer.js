var g_sharedGameLayer;

var GameLayer = cc.LayerColor.extend({
    screenRect: null,
    _texOpaqueBatch: null,
    init: function() {
        this.addAllFunction();
        this.addBackground();
        this.addSparks();
        this.createArrays();
        this.defineTheScreenRect();
        g_sharedGameLayer = this;
        this.preSets();
        this.addPlayer();
        this.addLifeLabel();
        this.scoreMax = ScoreRecord;
        this.addScoreLabel();
        this.addMaxScoreLabel();
        this.initSound();
        this.scheduleUpdate();
        return true;
    },

    update: function(dt) {
        if( !this.player.isLive() ){
            this.endGame();
        }
        this.scoreMax = this.scoreLabel.getPlayerScore();
        this.lifeLabel.getHit();
        this.count += dt;
        this.removeInactiveUnit(dt);
        if (this.count > 0.4) {
            this.spawnEnemy();
            this.count = 0;
        }
    },

    addMaxScoreLabel: function() {
        this.scoreMaxLabel = cc.LabelTTF.create( '0', 'Arial', 15 );
        this.scoreMaxLabel.setPosition( new cc.Point( 120, 580 ) );
        this.addChild( this.scoreMaxLabel );
        this.scoreMaxLabel.setString("High Score : "+this.scoreMax);
    },

    addBackground : function() {
        this.backGround = new Background();
        this.addChild(this.backGround);
    },

    endGame: function() {
        for (var j = 0; j < CL.CONTAINER.ENEMIES.length; j++) {
            selEnemy = CL.CONTAINER.ENEMIES[j];
            selEnemy.unscheduleUpdate();
        }
        this.unscheduleUpdate();
        SCORE = this.scoreLabel.getPlayerScore();
            if(this.scoreLabel.getPlayerScore()>ScoreRecord){
               ScoreRecord = this.scoreLabel.getPlayerScore();
           }
        cc.audioEngine.stopMusic( res.dancing_mp3);
        cc.director.runScene( new GameOverScene() );
    },

    initSound:function(){
        cc.audioEngine.playMusic( res.dancing_mp3, true );
    },

    defineTheScreenRect: function() {
        this.screenRect = cc.rect(0, 0, screenWidth, screenHeight + 10);
    },

    createArrays: function() {
        CL.CONTAINER.PLAYER_BULLETS = [];
        CL.CONTAINER.HITS = [];
        CL.CONTAINER.ENEMIES = [];
    },

    preSets :function() {
        Bullet.preSet();
        HitEffect.preSet();
    },

    addAllFunction: function() {
        cc.spriteFrameCache.addSpriteFrames(res.textureOpaquePack_plist);
        this.addKeyboardHandlers();
        this.addMouseHandlers();
    },

    addSparks: function() {
        var texOpaque = cc.textureCache.addImage(res.textureOpaquePack_png);
        this._texOpaqueBatch = new cc.SpriteBatchNode(texOpaque);
        this._sparkBatch = new cc.SpriteBatchNode(texOpaque);
        if (cc.sys.isNative) this._sparkBatch.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
        this.addChild(this._texOpaqueBatch);
        this.addChild(this._sparkBatch);
    },

    addPlayer: function() {
        this.player = new Player(400, 300, this);
        this.addChild(this.player);
        this.player.scheduleUpdate();
    },

    addLifeLabel: function() {
        this.lifeLabel = new lifeLabel();
        this.lifeLabel.setKnownPlayer(this.player);
        this.addChild(this.lifeLabel);
        this.count = 0;
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

GameLayer.prototype.addBullet = function(bullet) {
    this._texOpaqueBatch.addChild(bullet);
};

GameLayer.prototype.addBulletHits = function(hit, zOrder) {
    this._texOpaqueBatch.addChild(hit, zOrder);
};

var SCORE = 0;
var ScoreRecord = 0;