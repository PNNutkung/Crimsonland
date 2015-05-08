var HitEffect = cc.Sprite.extend({
    posX:0,
    posY:0,
    count:0,
    ctor: function( x, y ) {
        this._super();
        this.initWithFile(res.boom_png);
        this.setPosition( x, y );
        this.isHitEnemy = false;
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
        this.bulletBoom();
        this.setOpacity(this.opacity);
    },

    bulletBoom: function() {
        if (this.isHitEnemy) {
            this.scaleX += 0.05;
            this.scaleY += 0.05;
            if (this.scaleX >= 0.3 && this.scaleY >= 0.3) {
                this.isHitEnemy = false;
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