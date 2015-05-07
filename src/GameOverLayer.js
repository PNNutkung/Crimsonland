var GameOverScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameOverLayer();
        layer.init();
        this.addChild( layer );
    }
});

var GameOverLayer = cc.LayerColor.extend({
	init: function() {
		this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.createScoreLabel();
        this.createBackButton();
        this.createRetryButton();
        cc.audioEngine.playMusic( res.stranger_aeons_mp3, true );
        return true;
    },
    createScoreLabel:function(){
    	this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 45 );
        this.scoreLabel.setPosition(screenWidth/2,screenHeight/2);
        this.scoreLabel.setString("Your Score : "+SCORE);
        this.addChild(this.scoreLabel);

    },
     createBackButton:function(){
    	this.backButItem = new cc.MenuItemImage(
    		 res.menuBtnUp_png,
    		 res.menuBtnDown_png,
    		function () {
                cc.audioEngine.stopMusic( res.stranger_aeons_mp3);
                cc.audioEngine.playEffect( res.press_mp3 );
    			cc.director.runScene(new cc.TransitionFade(0.5,new StartScene()));
    		}, this);
    	this.backButton = new cc.Menu(this.backButItem);
    	this.addChild(this.backButton);
    	var deltaDistance = -80;
      	this.backButton.setPosition(screenWidth/4,(screenHeight/2)+deltaDistance);
    },
    createRetryButton:function(){
    	this.playAgainButItem = new cc.MenuItemImage(
    		res.retryBtnUp_png,
    		res.retryBtnDown_png,
    		function () {
                cc.audioEngine.stopMusic( res.stranger_aeons_mp3);
                cc.audioEngine.playEffect( res.press_mp3 );
    			cc.director.runScene(new cc.TransitionFade(0.5,new GamePlayScene()));
    		}, this);
    	this.RetryButton = new cc.Menu(this.playAgainButItem);
    	this.addChild(this.RetryButton);
    	var deltaDistance = -80;
      	this.RetryButton.setPosition(screenWidth*3/4,(screenHeight/2)+deltaDistance);
    }
});