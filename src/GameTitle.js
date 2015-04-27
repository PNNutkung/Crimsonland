var GameTitle = cc.LayerColor.extend({
    init: function() {
        this.setPosition(new cc.Point(0,0));
        this.addBackground();
        this.addPlayButton();
        this.playSoundBG();
        this.scheduleUpdate();
        return true;
    },

    addPlayButton: function() {
        this.playBtn = new cc.MenuItemImage(
            res.playBtnUp_png,
            res.playBtnDown_png,
            function() {
                cc.audioEngine.stopMusic( res.fear_mp3 );
                isPlayingSong = false;
                cc.director.runScene(new GamePlayScene());
            },this);
        this.playBtn = new cc.Menu(this.playBtn);
        this.addChild(this.playBtn);
    },

    addCreditsButton: function() {
        this.creditsBtn = new cc.MenuItemImage(
            res.creditsBtnUp_png,
            res.creditsBtnDown_png,
            function() {
                cc.director.runScene( new CreditScene() );
            }, this);

    },

    addBackground: function() {
        this.bg = new MenuBackGround();
        this.addChild(this.bg);
    },

    playSoundBG:function(){
      if(!isPlayingSong){
        cc.audioEngine.playMusic( res.fear_mp3 , true );
        isPlayingSong = true;
      }
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