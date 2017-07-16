var pointsArray = document.getElementsByClassName('point');

var revealPoint = function(point) {
  point.style.opacity = 1;
  point.style.transform = "scale(1) translateY(0)";
  point.style.msTransform = "scale(1) translateY(0)";
  point.style.WebkitTransform = "scale(1) translateY(0)";
};

var animatePoints = function(points){
  forEach(points, revealPoint);
};

window.onload = function() {
  var sellingPoints = document.getElementsByClassName('selling-points')[0];
  var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;

    window.addEventListener("scroll", function(event) {
      if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
             animatePoints(pointsArray);
         }
    });
}
