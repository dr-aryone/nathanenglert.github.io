var Ottr = Ottr || {};

Ottr.Player = function(game) {
    this.game = game;
    this.walkSpeed = 50;
    this.currentDirection = "down";
    this.currentAnimation = null;
};

Ottr.Player.prototype = {
    create: function(startPosition) {
        this.sprite = this.game.add.sprite(startPosition.x, startPosition.y, "player");

        this.sprite.animations.add("up-idle", [104]);
        this.sprite.animations.add("up-walk", Ottr.Utils.arrayForRange(105, 112));

        this.sprite.animations.add("left-idle", [117]);
        this.sprite.animations.add("left-walk", Ottr.Utils.arrayForRange(118, 125));        

        this.sprite.animations.add("down-idle", [130]);
        this.sprite.animations.add("down-walk", Ottr.Utils.arrayForRange(131, 138));

        this.sprite.animations.add("right-idle", [143]);
        this.sprite.animations.add("right-walk", Ottr.Utils.arrayForRange(144, 151));

        this.sprite.animations.add("up-attack-slash", Ottr.Utils.arrayForRange(157, 161));
        this.sprite.animations.add("left-attack-slash", Ottr.Utils.arrayForRange(170, 174));
        this.sprite.animations.add("down-attack-slash", Ottr.Utils.arrayForRange(183, 187));
        this.sprite.animations.add("right-attack-slash", Ottr.Utils.arrayForRange(196, 200));

        this.sprite.animations.play("down-idle", 12, true);

        this.game.physics.arcade.enable(this.sprite);

        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //  Stop the following keys from propagating up to the browser
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
    },
    getSprite: function () {
        return this.sprite;
    },
    update: function (collisionLayer) {
        if (this.spaceKey.isDown) {
            this.currentAnimation = this.sprite.animations.play(this.currentDirection + "-attack-slash", 12, false);
            return;
        }

        if (this.currentAnimation != null && this.currentAnimation.isPlaying)
            return;

        var vy = 0;
        var vx = 0;

        if (this.cursors.up.isDown) {
            vy -= this.walkSpeed;
        }
        if (this.cursors.down.isDown) {
            vy += this.walkSpeed;            
        }
        if (this.cursors.left.isDown) {
            vx -= this.walkSpeed;
        }
        if (this.cursors.right.isDown) {
            vx += this.walkSpeed;
        }

        this.sprite.body.velocity.x = vx;
        this.sprite.body.velocity.y = vy;

        if (vx === 0 && vy === 0) {
            this.sprite.animations.play(this.currentDirection + "-idle", 12, true);
            return;
        }

        if (vy > 0) {
            this.currentDirection = "down";
        }
        else if (vy < 0) {
            this.currentDirection = "up";
        }
        else if (vx < 0) {
            this.currentDirection = "left";
        }
        else if (vx > 0) {
            this.currentDirection = "right";
        }

        this.sprite.animations.play(this.currentDirection + "-walk", 12, true);

        // Collision
        this.game.physics.arcade.collide(this.sprite, collisionLayer);
        //m.game.physics.arcade.overlap(m.player, this.items, this.collect, null, this);
        //m.game.physics.arcade.overlap(m.player, this.doors, this.enterDoor, null, this);
    }
}