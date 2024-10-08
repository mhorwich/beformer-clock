let cx, cy;
let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;

function setup(){
createCanvas(125, 125);
  stroke(255);

  let radius = min(width, height) / 2;
  secondsRadius = radius * 0.71;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 0.5;
  clockDiameter = radius * 1.5;

  cx = width / 2;
  cy = height / 2;
}

function draw(){
  let hv = map(sin(frameCount/100), -1, 1, 0, 100);
  // let outerSize = map(noise(frameCount/100), -1, 1, 0, width/5);
  let strokeFade = map(noise(frameCount/50), -1, 1, 0, 100)
  
  colorMode(HSB, 100);
  fill(hv, 8, 90);
  stroke(100-hv, 8, 90, 50, strokeFade);
  strokeWeight(width/80);
  ellipse(
    cx,
    cy,
    clockDiameter,
    clockDiameter
  );

  // Angles for sin() and cos() start at 3 o'clock;
  // subtract HALF_PI to make them start at the top
  let s = map(second(), 60, 0, 0, TWO_PI) - HALF_PI;
  let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
  let h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

  // Draw the hands of the clock
  let bw = map(sin(frameCount/200), -1, 1, 0, 255);
  colorMode(RGB, 255);
  stroke(bw);
  strokeWeight(1);
  line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
  strokeWeight(2);
  line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
  strokeWeight(4);
  line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);

  // Draw the minute ticks
  strokeWeight(5);
  beginShape(POINTS);
  for (let a = 0; a < 360; a += 30) {
    let angle = radians(a);
    let x = cx + cos(angle) * secondsRadius;
    let y = cy + sin(angle) * secondsRadius;
    vertex(x, y);
  }
  endShape();
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
