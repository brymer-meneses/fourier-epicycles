var gradient_counter = 0;
function gradient(gradient_reset) {
  gradient_counter++;
  const c1 = linspace(1, 0, gradient_reset).slice(0, -1);

  var color = c1.concat(linspace(0, 1, gradient_reset));

  if (gradient_counter > 2 * gradient_reset - 5) {
    gradient_counter = 0;
  }

  return color[gradient_counter];
}

function linspace(startValue, stopValue, cardinality) {
  var array = [];
  var step = (stopValue - startValue) / (cardinality - 1);

  for (let i = 0; i < cardinality; i++) {
    array.push(startValue + step * i);
  }

  return array;
}
