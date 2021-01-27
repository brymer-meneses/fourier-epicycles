const width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;
const height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

// ============== Settings ===============
const gradient_reset = 500;
const x_pos = 100;
const y_pos = 300;

const color1 = [194, 229, 156];
const color2 = [100, 179, 244];

// =======================================

let radius_sf;

let x = [];
let y = [];
let z = [];
let slider;
let btn;
let path = [];

// for two-epicycle mode
let fourierY;
let fourierX;
// for one-epicycle mode
let fourierComplex;

function process_drawing(isComplex) {
  if (!isComplex) {
    for (let i = 0; i < drawing.length; i++) {
      x.push(drawing[i].x);
      y.push(drawing[i].y);
    }
    fourierY = dft(y);
    fourierX = dft(x);
    fourierX.sort((a, b) => b.amp - a.amp);
    fourierY.sort((a, b) => b.amp - a.amp);
  } else {
    for (let i = 0; i < drawing.length; i++) {
      const c = new Complex(drawing[i].x, drawing[i].y);
      z.push(c);
    }
    fourierComplex = dft_complex(z);
    fourierComplex.sort((a, b) => b.amp - a.amp);
  }
}

function setup() {
  let canvas = createCanvas(width, height * 0.94);
  canvas.position(width * 0.000001, width * 0.000001);

  slider = createSlider(1, 10, 1);
  slider.position((width * 0.9) / 2, height * 0.95);
  slider.input(updateScreen);

  radius_sf = slider.value();

  switch_button = createButton("switch mode");
  switch_button.position((width * 0.8) / 2, height * 0.95);

  switch_button.mousePressed(switchMode);

  process_drawing((isComplex = true));
  process_drawing((isComplex = false));
}

function switchMode() {
  mode = mode * -1;
  time = TWO_PI + 0.05;
}

function updateScreen() {
  radius_sf = slider.value();
  recentlyUpdated = true;
  time = TWO_PI + 0.05;
}

function draw() {
  background(0);

  // modes.js
  mode === -1 ? two_epicycles() : complex();
}
