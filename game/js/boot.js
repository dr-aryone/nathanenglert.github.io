var Ottr = Ottr || {};

Ottr.Boot = function () { };

//setting game configuration and loading the assets for the loading screen
Ottr.Boot.prototype = {
    preload: function () {
        //assets we'll use in the loading screen
        this.load.image('preloadbar', 'assets/images/preloader-bar.png');
    },
    create: function () {
        //loading screen will have a white background
        this.game.stage.backgroundColor = '#fff';

        //scaling options
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //have the game centered horizontally
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        // enable crisp rendering
        this.game.renderer.renderSession.roundPixels = true;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

        //physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.state.start('Preload');
    }
};