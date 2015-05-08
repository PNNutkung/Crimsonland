var Item = cc.Sprite.extend({
    ctor: function( posX, posY ) {
        this._super();
        this.setPosition( posX, posY );
        this.schedule( this.destroy , 10);
    },

    update: function(dt) {
        this.effect();
    },

    isHit: function() {
        return Math.abs(this.getPositionX() - g_sharedGameLayer.player.playerPosX()) <= 14 &&
               Math.abs(this.getPositionY() - g_sharedGameLayer.player.playerPosY()) <= 14;
    },

    destroy: function() {
        this.removeFromParent();
    },

    effect: function() {
    
    }

});