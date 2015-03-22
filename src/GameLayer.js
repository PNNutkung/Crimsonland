var GameLayer = cc.LayerColor.extend({
	init: function(){
		this.addKeyboardHandlers();

		this.player = new Player();
		this.player.setPosition( cc.p(400,300) );
		this.addChild( this.player );
		this.direction = Player.DIR.UP;
		this.player.scheduleUpdate();
	},
	addKeyboardHandlers: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed : function( keyCode, event ) {
                self.onKeyDown( keyCode, event );
            },
            onKeyReleased: function( keyCode, event ) {
                self.onKeyUp( keyCode, event );
            }
        }, this);
    },
    onKeyDown: function( keyCode, event ) {
		console.log( 'Down: ' + keyCode.toString() );
		switch( keyCode ) {
        case cc.KEY.a:
            this.player.setDirection( Player.DIR.LEFT );
            break;
        case cc.KEY.d:
            this.player.setDirection( Player.DIR.RIGHT );
            break;
        case cc.KEY.w:
            this.player.setDirection( Player.DIR.UP );
            break;
        case cc.KEY.s:
            this.player.setDirection( Player.DIR.DOWN );
            break;
        case cc.KEY.left:
        	this.player.setRotation(-17);
        	break;
        case cc.KEY.right:
        	this.player.setRotation(17);
        	break;
        }

    },
    onKeyUp: function( keyCode, event ) {
		console.log( 'Up: ' + keyCode.toString() );
		this.player.setNextDirection( Player.DIR.STILL );
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