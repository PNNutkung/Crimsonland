var scoreLabel = cc.LabelTTF.extend({
    ctor: function() {
        this._super();
        this.scoreLabel = cc.LabelTTF.create( 'Score: 0', 'Arial', 40 );
        this.scoreLabel.setPosition( new cc.Point( 120, 550 ) );
        this.player = null;
        this.score = 0;
        this.addChild( this.scoreLabel );
    },

    getScore: function( score ) {
        this.score += score;
        this.scoreLabel.setString( 'Score: '+ this.score );
    }
});