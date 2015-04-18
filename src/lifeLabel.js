var lifeLabel = cc.LabelTTF.extend({
    ctor: function() {
        this._super();
        this.lifeLabel = cc.LabelTTF.create( 'HP: 100', 'Arial', 40 );
        this.lifeLabel.setPosition( new cc.Point( 700, 50 ) );
        this.player = null;
        this.addChild( this.lifeLabel );
    },
    getHit: function() {
        this.lifeLabel.setString( 'HP: '+this.player.getHitPoints() );
    },
    setKnownPlayer: function( player ) {
        this.player = player;
    }
});