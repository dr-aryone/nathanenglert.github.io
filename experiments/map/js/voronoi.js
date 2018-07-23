var Voronoi = (function () {
  function generate(options) {
    options.height = options.height || 960;
    options.iterations = options.iterations || 2;
    options.width = options.width || 500;

    var voronoi = d3.voronoi().extent([[-1, -1],[options.width + 1, options.height + 1]])
    var points = d3.range(100).map(function(d){
      return [Math.random() * options.width, Math.random() * options.height];
    });

    return relax(voronoi, options, points, 0);
  }

  function relax(voronoi, options, points, i) {
    var polygons = voronoi(points).polygons();
    var centroids = polygons.map(d3.polygonCentroid);

    i++;

    if (i == options.iterations) {
      return {
        points,
        polygons,
        triangles: voronoi(points).triangles()
      };
    } else {
      return relax(voronoi, options, centroids, i);
    }
  }

  function draw(points, polygons) {
    context.fillStyle = "#ff3d7f";
    context.strokeStyle = "#eaeaea";

    context.beginPath();
    polygons.forEach(function(polygon){
      context.moveTo(polygon[0][0], polygon[0][1]);
      polygon.slice(1).forEach(function(point){
        context.lineTo(point[0], point[1]);
      });
      context.lineTo(polygon[0][0], polygon[0][1]);
    });
    context.stroke();

    context.beginPath();
    points.forEach(function(point){
      context.moveTo(point[0], point[1]);
      context.arc(point[0], point[1], 2, 0, 2 * Math.PI);
    });
    context.fill();
  }

  function distance(a, b) {
    return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
  }

  return {
    draw: draw,
    generate: generate
  }
}());