var HowToScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new HowToLayer();
        layer.init();
        this.addChild(layer);
    },
});

var HowToLayer = cc.LayerColor.extend({
    init: function() {
        this.howToPage = new HowToPage()
        this.addChild(this.howToPage);
        this.createBackButton();
        return true;
    },
    createBackButton: function() {
        this.backButItem = new cc.MenuItemImage(
            res.backBtnUp_png,
            res.backBtnDown_png,
            function() {
                cc.director.runScene(new cc.TransitionFade(0.5,new StartScene()));
            }, this);
        this.backButton = new cc.Menu(this.backButItem);
        this.addChild(this.backButton);
        var deltaDistance = -80 * 2;
        this.backButton.setPosition(100, 550);
    }

});
var HowToPage = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile(res.howToPlayBG_png);
        this.setPosition(screenWidth / 2, screenHeight / 2);
    }
});