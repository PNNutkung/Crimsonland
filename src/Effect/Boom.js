var Boom = cc.Sprite.extend({
	posX:0,
	posY:0,
	count:0,
	ctor: function( x, y ) {
		this._super();
		this.setPosition( x, y );
		this.isHitBomb = false;
		this.initWithFile(res.boom_png);
		this.isOn = false;
        this.scaleX = 0;
        this.scaleY = 0;
		this.posX = x;
		this.opacity = 255;
		this.posY = y;
		this.scheduleUpdate();
	},

    update: function() {
    	this.setScale(this.scaleX,this.scaleY);
        this.kaboomBitch();
        this.setOpacity(this.opacity);
    },

    kaboomBitch: function() {
        if (this.isHitBomb) {
            this.scaleX += 0.05;
            this.scaleY += 0.05;
            if (this.scaleX >= 1.25 && this.scaleY >= 1.25) {
                this.isHitBomb = false;
                this.count = 1;
            }
        }
         else {
            this.scaleX -= 0.025;
            this.scaleY -= 0.025;
            this.opacity -= 25.5;
            if (this.scaleX <= 0  && this.scaleY <= 0.2) {
                this.scaleX = 0;
                this.scaleY = 0;
                
            }
            else if(this.count >= 1 && this.opacity <= 0){
            	this.removeFromParent();
            }
        }
    }
});