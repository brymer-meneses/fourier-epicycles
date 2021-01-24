// complex to two_epicycle mode
// mode = 1 -> complex
// mode = -1 -> two_epicycle
let mode = 1;

function two_epicycles() {
  let vx = draw_epicycle(width / 2, height * 0.05, fourierX, radius_sf, 0);
  let vy = draw_epicycle(
    width * 0.05,
    height / 2,
    fourierY,
    radius_sf,
    HALF_PI
  );

  let v = createVector(vx.x, vy.y);
  path.unshift(v);

  draw_path(path);

  stroke(255);
  line(vx.x, vx.y, v.x, v.y);
  line(vy.x, vy.y, v.x, v.y);

  const dt = TWO_PI / fourierY.length;
  time += dt;

  if (time > TWO_PI) {
    time = 0;
    path = [];
  }
}

function complex() {
  let v = draw_epicycle(width / 2, height / 2, fourierComplex, radius_sf, 0);
  path.unshift(v);
  draw_path(path);

  const dt = TWO_PI / fourierY.length;
  time += dt;

  if (time > TWO_PI) {
    time = 0;
    path = [];
  }
}
