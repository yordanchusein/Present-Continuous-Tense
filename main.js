const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let particles = [];
const mouse = { x: null, y: null };

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() - 0.5;
    this.speedY = Math.random() - 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

    // tarik ke cursor
    if (mouse.x && mouse.y) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        this.x += dx * 0.02;
        this.y += dy * 0.02;
      }
    }
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,140,0,0.9)";
    ctx.shadowColor = "#ff8c00";
    ctx.shadowBlur = 15;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// gradient ikut cursor

function init() {
  particles = [];
  for (let i = 0; i < 120; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#F7F4EF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

init();
animate();
