const width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;
const height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

// ============== Settings ===============
let radius_sf;
const wave_length = 1000;
const gradient_reset = 500;
const x_pos = 100;
const y_pos = 300;

const color1 = [194, 229, 156];
const color2 = [100, 179, 244];

// =======================================

let time = 0;
let x = [];
let y = [];
let slider;
let btn;
let recentlyUpdated = false;
let path = [];

let fourierY;
let fourierX;

function process_drawing() {
  for (let i = 0; i < drawing.length; i++) {
    x.push(drawing[i].x);
    y.push(drawing[i].y);
  }
}

function setup() {
  const windowWidth = width * 0.92;
  const windowHeight = height * 0.92;
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(width * 0.043, width * 0.005);

  slider = createSlider(1, 10, 5);
  slider.position((width * 0.9) / 2, height * 0.95);

  process_drawing();

  fourierY = dft(y);
  fourierX = dft(x);

  fourierX.sort((a, b) => b.amp - a.amp);
  fourierY.sort((a, b) => b.amp - a.amp);
  radius_sf = slider.value() * (1 / 10);

  slider.input(updateScreen);
}

function updateScreen() {
  radius_sf = slider.value() * (1 / 10);
  recentlyUpdated = true;
  time = TWO_PI + 0.05;
}

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

function draw() {
  background(0);

  let vx = draw_epicycle(width * 0.4, width * 0.05, fourierX, radius_sf, 0);
  let vy = draw_epicycle(
    width * 0.05,
    width * 0.2,
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
