var g_sharedGameLayer;

var GameLayer = cc.LayerColor.extend({
    screenRect:null,
    _texOpaqueBatch:null,
	init: function(){
        cc.spriteFrameCache.addSpriteFrames(res.textureOpaquePack_plist);
		this.addKeyboardHandlers();
        this.addMouseHandlers();

        var texOpaque = cc.textureCache.addImage(res.textureOpaquePack_png);
        this._texOpaqueBatch = new cc.SpriteBatchNode(texOpaque);
        this._sparkBatch = new cc.SpriteBatchNode(texOpaque);
        if(cc.sys.isNative) this._sparkBatch.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
        this.addChild(this._texOpaqueBatch);
        this.addChild(this._sparkBatch);

        this.screenRect = cc.rect(0, 0, screenWidth, screenHeight + 10);

        g_sharedGameLayer = this;

        Bullet.preSet();
        HitEffect.preSet();

        CL.CONTAINER.PLAYER_BULLETS = [];
        CL.CONTAINER.HITS = [];
        this.player = new Player();
        this.player.setPosition( cc.p(400,300) );
        this.addChild( this.player );

        this.scheduleUpdate();
        this.player.scheduleUpdate();

        return true;
    },
    update:function (dt) {
            //this.checkIsCollide();
            this.removeInactiveUnit(dt);
            //this.checkIsReborn();
           // this.updateUI();
            //this._movingBackground(dt);
    },
    removeInactiveUnit:function (dt) {
        var i, selChild, children = this._texOpaqueBatch.children;
        for (i in children) {
            selChild = children[i];
            if (selChild && selChild.active)
                selChild.update(dt);
        }

        /*children = this._sparkBatch.children;
        for (i in children) {
            selChild = children[i];
            if (selChild && selChild.active)
                selChild.update(dt);
        }*/
    },
    addKeyboardHandlers: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed : function( keyCode, event ) {
                CL.KEYS[keyCode] = true;
            },
            onKeyReleased: function( keyCode, event ) {
                CL.KEYS[keyCode] = false;
            }
        }, this);
    },
    addMouseHandlers: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseMove : function( event ){
                self.player.handleTouchMove(event);
            },
            onMouseDown : function( event ){
                var str = "Mouse Down detected, Key: " + event.getButton();
                console.log(str);
                if( event.getButton() == 0){
                    self.player.shoot();
                }
            } 
        }, this);
    }
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }

});

GameLayer.prototype.addBullet = function (bullet) {
    this._texOpaqueBatch.addChild(bullet);
};

GameLayer.prototype.addBulletHits = function (hit, zOrder) {
    this._texOpaqueBatch.addChild(hit, zOrder);
};