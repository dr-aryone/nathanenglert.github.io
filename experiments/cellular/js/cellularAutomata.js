var CellularAutomata = (function() {
  var TYPE_WALL = 1;
  var TYPE_FLOOR = 0;
  var TYPE_FLOOR_MAIN = 2;

  function countAliveNeighbours(map, x, y, width, height)
  {
      var count = 0;

      for (var i = -1; i < 2; i++)
      {
          for (var j = -1; j < 2; j++)
          {
              var neighbourX = x + i;
              var neighbourY = y + j;

              if (i == 0 && j == 0)
              {
                  continue;
              }

              if (neighbourX < 0 || neighbourY < 0 || neighbourX >= width || neighbourY >= height)
              {
                  count = count + 1;
              }
              else if (map[neighbourX][neighbourY] == TYPE_WALL)
              {
                  count = count + 1;
              }
          }
      }

      return count;
  }

  function doSimulationStep(oldMap, width, height, options)
  {
      var newMap = [];

      for (var x = 0; x < width; x++)
      {
        newMap.push([]);

        for (var y = 0; y < height; y++)
        {
          var nbs = countAliveNeighbours(oldMap, x, y, width, height);

          if (oldMap[x][y] == TYPE_WALL)
          {
            var type = nbs >= options.LIMIT_DEATH ? TYPE_WALL : TYPE_FLOOR;
            newMap[x].push(type);
          } 
          else
          {
            var type = nbs > options.LIMIT_BIRTH ? TYPE_WALL : TYPE_FLOOR;
            newMap[x].push(type); 
          }
        }
      }

      return newMap;
  }

  function initialiseMap(width, height, options)
  {
    var map = [];

    for (var x = 0; x < width; x++)
    {
      map.push([]);

      for (var y = 0; y < height; y++)
      {
        var type = Math.random() < options.CHANCE_TO_START_ALIVE ? TYPE_WALL : TYPE_FLOOR;
        map[x].push(type);
      }
    }
    
    return map;
  }

  return {
    generate (width, height, options) {
      var map = initialiseMap(width, height, options);
      var i = 0;

      var interval = setInterval(function () {
        console.log(i);

        map = doSimulationStep(map, width, height, options);

        var flatten = map.reduce((acc, val) => acc.concat(val), []);
        CanvasRender.drawMap(flatten);

        i++;
        if (i == options.NUMBER_OF_STEPS)
          clearInterval(interval);
      }, options.DRAW_SPEED)

      // for (var i = 0; i < options.NUMBER_OF_STEPS; i++)
      // {
        
      // }

      // var flatten = map.reduce((acc, val) => acc.concat(val), []);
      // return flatten;
    }
  }
}());