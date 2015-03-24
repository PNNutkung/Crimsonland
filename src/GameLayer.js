var GameLayer = cc.LayerColor.extend({
	init: function(){
		this.addKeyboardHandlers();

    	this.player = new Player();
		this.player.setPosition( cc.p(400,300) );
		this.addChild( this.player );
		this.direction = Player.DIR.UP;
		this.player.scheduleUpdate();
        return true;
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