var GameTitle = cc.LayerColor.extend({
    init: function() {
        this._super();
        this.addBackground();
    },

    addBackground: function() {
        this.backGround = new cc.Sprite.create('src/images/gameTitle.png');
        this.backGround.setPosition(new cc.Point(400,300));
        this.addChild(this.backGround);
    }
});