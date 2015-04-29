var Item = cc.Sprite.extend({
    ctor: function( posX, posY ) {
        this._super();
        this.setPosition( posX, posY);
        this.init();
    },

    update: function(dt) {
        this.move();
        this.destroy(this.player);
        this.effectToPlayer();
    },

    isHit: function() {
        return Math.abs(this.getPositionX() - g_sharedGameLayer.player.playerPosX()) <= 14 &&
               Math.abs(this.getPositionY() - g_sharedGameLayer.player.playerPosY()) <= 14;
    },

    destroy: function(player) {
        this.removeFromParent();
    }

});