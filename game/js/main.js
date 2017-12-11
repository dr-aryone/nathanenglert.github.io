var Ottr = Ottr || {};

var width = Math.ceil((480 / window.innerHeight) * window.innerWidth);

Ottr.client = new Phaser.Game(width, 480, Phaser.AUTO, '');

Ottr.client.state.add('Boot', Ottr.Boot);
Ottr.client.state.add('Preload', Ottr.Preload);
Ottr.client.state.add('Game', Ottr.Game);

Ottr.client.state.start('Boot');