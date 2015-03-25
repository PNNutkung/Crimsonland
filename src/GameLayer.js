var GameLayer = cc.LayerColor.extend({
	init: function(){
		this.addKeyboardHandlers();
        this.addMouseHandlers();

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
    },
    addMouseHandlers: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseMove : function( event ){
                var str = "MousePosition X: " + parseInt(event.getLocationX()) + "  Y:" + parseInt(event.getLocationY());
                self.player.handleTouchMove(event);
            },  
            onMouseDown : function( event ){
                var str = "Mouse Down detected, Key: " + event.getButton();
                console.log(str);
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