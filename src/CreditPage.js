var CreditScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new CreditLayer();
        layer.init();
        this.addChild(layer);
    }
});

var CreditLayer = cc.LayerColor.extend({
    init: function() {
        this.creditsPage = new CreditsPage()
        this.addChild(this.creditsPage);
        this.createBackButton();
        return true;

    },
    createBackButton: function() {
        this.backButItem = new cc.MenuItemImage(
            res.backBtnUp_png,
            res.backBtnDown_png,
            function() {
                cc.audioEngine.playEffect(res.press_mp3);
                cc.director.runScene(new cc.TransitionFade(0.5,new StartScene()));
            }, this);
        this.backButton = new cc.Menu(this.backButItem);
        this.addChild(this.backButton);
        var deltaDistance = -80 * 2;
        this.backButton.setPosition(screenWidth / 2, (screenHeight / 2) + deltaDistance);
    }

});
var CreditsPage = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile(res.credit_png);
        this.setPosition(screenWidth / 2, screenHeight / 2);
    }
});