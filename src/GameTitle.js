var GameTitle = cc.LayerColor.extend({
    init: function() {
        this.setPosition(new cc.Point(0,0));
        this.addBackground();
        this.addPlayButton();
        this.scheduleUpdate();
        return true;
    },

    addPlayButton: function() {
        this.playBtn = new cc.MenuItemImage(
            res.playBtnUp_png,
            res.playBtnDown_png,
            function() {
                cc.director.runScene(new GameLayer());
            },this);
        this.playBtn = new cc.Menu(this.playBtn);
        this.addChild(this.playBtn);
    },

    addBackground: function() {
        this.bg = new MenuBackGround();
        this.addChild(this.bg);
    },

    update: function() {
        
    }
});

var MenuBackGround = cc.Sprite.extend({
    ctor:function(){
        this._super();
        this.initWithFile(res.gameTitle_png);
        this.setPosition(screenWidth/2,screenHeight/2);
    },
});

var GamePlayScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    },
});

var StartScene = cc.Scene.extend({  
    onEnter: function() {
        this._super();
        var layer = new GameTitle();
        layer.init();
        this.addChild( layer );
    },
});
var isPlayingSong = false;
