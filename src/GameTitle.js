var GameTitle = cc.LayerColor.extend({
    init: function() {
        this.setPosition(new cc.Point(0,0));

        this.backGround = new cc.Sprite.create('picture');
        this.backGround.setPosition(new cc.Point(400,300));
        this.addChild(this.backGround);
    }
});