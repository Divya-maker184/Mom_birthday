document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function Confetti() {
    this.x = random(0, canvas.width);
    this.y = random(-canvas.height, 0);
    this.size = random(5, 15);
    this.speed = random(2, 5);
    this.rotation = random(0, Math.PI * 2);
    this.color = `hsl(${random(0, 360)}, 100%, 70%)`;

    this.draw = function() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
      ctx.restore();
    };

    this.update = function() {
      this.y += this.speed;
      this.rotation += 0.05;
      if (this.y > canvas.height + this.size) {
        this.y = -this.size;
        this.x = random(0, canvas.width);
      }
    };
  }

  const confettiCount = 150;
  const confetti = [];
  for (let i = 0; i < confettiCount; i++) {
    confetti.push(new Confetti());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
      c.update();
      c.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
});