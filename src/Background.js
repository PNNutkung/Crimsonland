var Background = cc.Sprite.extend({
	ctor: function() {
		this._super();
        this.initWithFile( res.backGround_png );
        this.setPosition(400,300);
	}
});