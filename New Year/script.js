/* Mouse Reveal */
let pos = document.documentElement;
pos.addEventListener("mousemove", e => {
    pos.style.setProperty('--x', e.clientX + 'px');
    pos.style.setProperty('--y', e.clientY + 'px');
});

/* Fireworks */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createFirework(x, y) {
    for (let i = 0; i < 40; i++) {
        particles.push({
            x, y,
            radius: Math.random() * 2 + 1,
            color: `hsl(${Math.random() * 360},100%,50%)`,
            speedX: (Math.random() - 0.5) * 5,
            speedY: (Math.random() - 0.5) * 5,
            life: 80
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life--;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        if (p.life <= 0) particles.splice(i, 1);
    });

    requestAnimationFrame(animate);
}

/* Auto fireworks */
setInterval(() => {
    createFirework(
        Math.random() * canvas.width,
        Math.random() * canvas.height / 2
    );
}, 700);

animate();

/* Resize fix */
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});