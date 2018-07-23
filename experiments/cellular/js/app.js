var App = new Vue({
  el: "#app",
  data: {
    height: 24,
    options: {
      CHANCE_TO_START_ALIVE: 0.45, // how dense the initial grid is with living cells
      DRAW_SPEED: 12,
      LIMIT_BIRTH: 4, // the number of neighbours that cause a dead cell to become alive
      LIMIT_DEATH: 2, // the number of neighbours that cause a living cell to die
      NUMBER_OF_STEPS: 40 // the number of times we perform the simulation step
    },
    scale: 8,
    width: 24
  },
  methods: {    
    drawMap (map) {
      CanvasRender.drawMap(map);
    },
    generateMap () {
      return CellularAutomata.generate(this.width, this.height, this.options);      
    }
  },
  mounted: function() {
    var self = this;

    self.height = Math.floor(window.innerHeight / self.scale);
    self.width = Math.floor(window.innerWidth / self.scale);

    self.canvas = self.$refs['preview-canvas'];
    self.context = self.canvas.getContext("2d");
  
    self.canvas.width = self.width;
    self.canvas.height = self.height;
    self.canvas.style.width = (self.width*self.scale) + 'px';
    self.canvas.style.height = (self.height*self.scale) + 'px'; 

    CanvasRender.init(self.context, self.height, self.width);

    var map = self.generateMap();
    //self.drawMap(map);
  }
});