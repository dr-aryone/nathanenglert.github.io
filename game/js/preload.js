var Ottr = Ottr || {};

//loading the game assets
Ottr.Preload = function () { };

Ottr.Preload.prototype = {
    preload: function () {
        //show loading screen
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);

        //load game assets
        this.load.tilemap('test', 'data/maps/test.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('gameTiles', 'assets/terrain/terrain.png');
        this.load.spritesheet('player', 'assets/images/player.png', 64, 64);

    },
    create: function () {
        this.state.start('Game');
    }
};