// functions for implement the discrete fourier transform
// and complex class

function dft(x) {
  let X = [];
  const N = x.length;

  for (let k = 0; k < N; k++) {
    let re = 0;
    let im = 0;

    for (let n = 0; n < N; n++) {
      const theta = (TWO_PI * k * n) / N;
      re += x[n] * cos(theta);
      im -= x[n] * sin(theta);
    }
    re = re / N;
    im = im / N;

    // amp = norm(Z)
    // freq = N
    // phase = angle

    const freq = k;
    const amp = sqrt(re * re + im * im);
    const phase = atan2(im, re);

    X[k] = { re, im, freq, amp, phase };
  }
  return X;
}

class Complex {
  constructor(a, b) {
    this.re = a;
    this.im = b;
  }

  add(c) {
    this.re += c.re;
    this.im += c.im;
    return new Complex(this.re, this.im);
  }

  mult(c) {
    const re = this.re * c.re - this.im * c.im;
    const im = this.re * c.im + this.im * c.re;
    return new Complex(re, im);
  }
}

function dft_complex(x) {
  let X = [];
  const N = x.length;

  for (let k = 0; k < N; k++) {
    sum = new Complex(0, 0);

    for (let n = 0; n < N; n++) {
      const theta = (TWO_PI * k * n) / N;
      const c = new Complex(cos(theta), -sin(theta));

      sum = sum.add(x[n].mult(c));
    }
    sum.re = sum.re / N;
    sum.im = sum.im / N;

    // amp = norm(Z)
    // freq = N
    // phase = angle

    const freq = k;
    const amp = sqrt(sum.re * sum.re + sum.im * sum.im);
    const phase = atan2(sum.im, sum.re);

    X[k] = { re: sum.re, im: sum.im, freq, amp, phase };
  }
  return X;
}
