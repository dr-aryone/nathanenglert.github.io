var Delaunay = (function () {
  function draw(triangles) {
    context.fillStyle = "#ff3d7f";
    context.strokeStyle = "#3fb8af";

    triangles.forEach(function(tri) {
      context.beginPath();
      context.moveTo(tri[0][0], tri[0][1]);
      context.lineTo(tri[1][0], tri[1][1]);
      context.lineTo(tri[2][0], tri[2][1]);
      context.lineTo(tri[0][0], tri[0][1]);
      context.stroke();
    });
  }

  return {
    draw: draw
  }
}());