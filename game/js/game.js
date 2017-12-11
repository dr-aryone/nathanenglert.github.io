var Ottr = Ottr || {};

//title screen
Ottr.Game = function () { };

Ottr.Game.prototype = {
    create: function () {
        this.map = this.game.add.tilemap('test');
        this.map.addTilesetImage('terrain', 'gameTiles');

        // Layers
        this.backgroundLayer = this.map.createLayer('backgroundLayer');
        this.blockedLayer = this.map.createLayer('blockedLayer');

        // Layer Collisions
        this.map.setCollisionBetween(1, 600, true, 'blockedLayer');

        this.backgroundLayer.resizeWorld();

        //create player
        var result = this.findObjectsByType('playerStart', this.map, 'objectLayer');

        this.player = new Ottr.Player(this.game);
        this.player.create(result[0]);

        this.game.camera.follow(this.player.getSprite());
    },
    update: function () {
        this.player.update(this.blockedLayer);
    },
    collect: function (player, collectable) {
        console.log('yummy!');

        //remove sprite
        collectable.destroy();
    },
    enterDoor: function (player, door) {
        console.log('entering door that will take you to ' + door.targetTilemap + ' on x:' + door.targetX + ' and y:' + door.targetY);
    },
    createItems: function () {
        //create items
        this.items = this.game.add.group();
        this.items.enableBody = true;
        var item;
        result = this.findObjectsByType('item', this.map, 'objectLayer');
        result.forEach(function (element) {
            this.createFromTiledObject(element, this.items);
        }, this);
    },
    createDoors: function () {
        //create doors
        this.doors = this.game.add.group();
        this.doors.enableBody = true;
        result = this.findObjectsByType('door', this.map, 'objectLayer');

        result.forEach(function (element) {
            this.createFromTiledObject(element, this.doors);
        }, this);
    },
    //find objects in a Tiled layer that containt a property called "type" equal to a certain value
    findObjectsByType: function(type, map, layer) {
        var result = new Array();
        map.objects[layer].forEach(function (element) {            
            if(element.type === type) {
                //Phaser uses top left, Tiled bottom left so we have to adjust the y position
                //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
                //so they might not be placed in the exact pixel position as in Tiled
                element.y -= map.tileHeight;
                result.push(element);
            }      
        });
        return result;
    },
    //create a sprite from an object
    createFromTiledObject: function (element, group) {
        var sprite = group.create(element.x, element.y, element.properties.sprite);

        //copy all properties to the sprite
        Object.keys(element.properties).forEach(function (key) {
            sprite[key] = element.properties[key];
        });
    }
}