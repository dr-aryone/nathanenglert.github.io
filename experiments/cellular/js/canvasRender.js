var CanvasRender = (function() {
  var _context, _height, _width;  

  function drawMap (map) {
    var x = 0;
    var y = 0;

    for (var i in map) {        
      drawPosition(map[i], x, y)

      x++;

      if (x == _width) {
        x = 0;
        y++;
      }
    }
  }

  function drawPosition(pos, x, y) {
    var color = [];

    switch (pos) {
      case 0:
        color = [255, 255, 255, 255];
        break;
      case 1:
        color = [0, 0, 0, 255];
        break;
      case 10:
        color = [0, 255, 0, 255]
        break;
      case 20:
        color = [255, 0, 0, 255]
        break;
    }

    sendToCanvas(color, 1, 1, x, y);
  }

  function sendToCanvas (pixels, height, width, x, y) {
    var array = new Uint8ClampedArray(pixels);
    var image = new ImageData(array, width, height);

    x = parseInt(x);
    y = parseInt(y);
    
    _context.putImageData(image, x, y);        
  }

  return {
    drawMap: drawMap,
    drawPosition: drawPosition,
    init: function(context, height, width) {
      _context = context;
      _height = height;
      _width = width;
    }
  }
}());