let texts = [
  "Happy",
  "60th",
  "Birthday",
  "Mike",
  "and",
  "Marina",
  "Love",
  "from",
  "Nigel",
  "and",
  "Helen",
  "xx"
];
let positions = [];
let velocities = [];
let colors = [];
let balloons = [];
let confetti = [];

function setup() {
  createCanvas(windowWidth, windowHeight); // Fullscreen canvas
  textAlign(CENTER, CENTER);

  // Initialize positions, velocities, and colors for each text
  for (let i = 0; i < texts.length; i++) {
    positions.push(createVector(random(width), random(height)));
    velocities.push(createVector(random(-2, 2), random(-2, 2)));
    colors.push(color(random(255), random(255), random(255)));
  }

  // Initialize balloons
  for (let i = 0; i < 10; i++) {
    balloons.push({
      x: random(width),
      y: random(height, height + 200),
      color: color(random(255), random(255), random(255))
    });
  }

  // Initialize confetti
  for (let i = 0; i < 50; i++) {
    confetti.push({
      x: random(width),
      y: random(height),
      size: random(width * 0.01, width * 0.02), // Scaled for screen size
      color: color(random(255), random(255), random(255))
    });
  }
}

function draw() {
  background(50, 100, 150);

// Draw balloons
for (let balloon of balloons) {
  fill(balloon.color);
  noStroke();
  ellipse(balloon.x, balloon.y, width * 0.1, height * 0.12); // Adjust height to make the balloon more rounded
  fill(255);
  rect(balloon.x - 2, balloon.y + height * 0.06, 4, height * 0.02); // Adjust string position and size
  balloon.y -= 1; // Balloons rise
  if (balloon.y < -100) {
    balloon.y = random(height, height + 200); // Reset when offscreen
  }
}


  // Draw confetti
  for (let c of confetti) {
    fill(c.color);
    noStroke();
    ellipse(c.x, c.y, c.size, c.size);
    c.y += random(1, 3); // Confetti falls
    if (c.y > height) {
      c.y = -10; // Reset when offscreen
      c.x = random(width);
    }
  }

  // Animate text
  for (let i = 0; i < texts.length; i++) {
    fill(colors[i]);
    noStroke();

    // Scale text sizes for "60th" and others
    if (texts[i] === "60th") {
      textSize(width * 0.1); // Larger size for "60th"
    } else {
      textSize(width * 0.05); // Smaller size for other texts
    }

    text(texts[i], positions[i].x, positions[i].y);

    // Update positions
    positions[i].add(velocities[i]);

    // Bounce off edges
    if (positions[i].x < 0 || positions[i].x > width) {
      velocities[i].x *= -1;
    }
    if (positions[i].y < 0 || positions[i].y > height) {
      velocities[i].y *= -1;
    }
  }
}

// Handle window resize for responsiveness
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
