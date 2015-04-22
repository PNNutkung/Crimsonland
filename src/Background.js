var Background = cc.Sprite.extend({
	ctor: function() {
		this._super();
        this.initWithFile('res/images/background.png');
        this.setPosition(400,300);
	}
});