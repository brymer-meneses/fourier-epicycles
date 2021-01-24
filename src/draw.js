let time = 0;

function draw_epicycle(x, y, fourier, radius_sf, rotation) {
  for (let i = 0; i < fourier.length; i++) {
    const prevx = x;
    const prevy = y;

    const freq = fourier[i].freq;
    const radius = radius_sf * fourier[i].amp;
    const phase = fourier[i].phase;

    strokeWeight(1);
    stroke(255, 80);
    noFill();
    circle(prevx, prevy, radius * 2);

    x += radius * cos(freq * time + phase + rotation);
    y += radius * sin(freq * time + phase + rotation);

    fill(255);
    stroke(255);
    line(prevx, prevy, x, y);
  }

  return createVector(x, y);
}

function draw_path(path) {
  beginShape();
  noFill();
  strokeWeight(2);
  stroke(lerpColor(color(color1), color(color2), gradient(gradient_reset)));
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x, path[i].y);
  }
  endShape();
}
