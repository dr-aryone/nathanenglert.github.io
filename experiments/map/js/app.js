var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

function reset() {
  var width = window.innerWidth;
  var height = window.innerHeight;

  canvas.height = height;
  canvas.width = width;
  context.clearRect(0, 0, width, height);

  var v = Voronoi.generate({
    height: height,
    iterations: 2,
    width: width
  });
  Voronoi.draw(v.points, v.polygons);

  Delaunay.draw(v.triangles);
}

reset();