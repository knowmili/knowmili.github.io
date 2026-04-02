// ================================
// Navbar scroll effect
// ================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ================================
// Hamburger menu
// ================================
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  const links = document.querySelector('.nav-links');
  if (links.style.display === 'flex') {
    links.style.display = 'none';
  } else {
    links.style.display = 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '100%';
    links.style.left = '0';
    links.style.right = '0';
    links.style.background = 'rgba(5,10,14,0.98)';
    links.style.padding = '1.5rem 2.5rem';
    links.style.borderBottom = '1px solid rgba(0,212,170,0.1)';
    links.style.gap = '1.2rem';
  }
});

// ================================
// Typing animation for name
// ================================
(function initTypingAnimation() {
  const nameEl = document.getElementById('typed-name');
  const roleEl = document.getElementById('typed-role');
  const name = 'Milind Chauhan';
  const roles = ['AI/ML Engineer', 'MLOps Builder', 'Researcher', 'Problem Solver'];
  let roleIndex = 0;

  // Type the name first
  function typeName(i) {
    if (i <= name.length) {
      nameEl.textContent = name.substring(0, i);
      setTimeout(() => typeName(i + 1), 120);
    } else {
      // After name is typed, start role cycling
      setTimeout(() => typeRole(roles[roleIndex], 0), 600);
    }
  }

  // Type a role
  function typeRole(role, i) {
    if (i <= role.length) {
      roleEl.textContent = role.substring(0, i);
      setTimeout(() => typeRole(role, i + 1), 60);
    } else {
      // Pause then delete
      setTimeout(() => deleteRole(role, role.length), 2000);
    }
  }

  // Delete a role
  function deleteRole(role, i) {
    if (i >= 0) {
      roleEl.textContent = role.substring(0, i);
      setTimeout(() => deleteRole(role, i - 1), 35);
    } else {
      // Move to next role
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(() => typeRole(roles[roleIndex], 0), 400);
    }
  }

  // Start after a short delay
  setTimeout(() => typeName(0), 500);
})();

// ================================
// Particle network background
// ================================
(function initParticles() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  let w, h;
  const particles = [];
  const PARTICLE_COUNT = 45;
  const CONNECTION_DIST = 150;
  const colors = [
    { r: 0, g: 212, b: 170 },   // accent
    { r: 0, g: 168, b: 232 },   // accent2
    { r: 123, g: 97, b: 255 },  // accent3
  ];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Create particles
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      color: color,
      alpha: Math.random() * 0.5 + 0.2,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const opacity = (1 - dist / CONNECTION_DIST) * 0.15;
          const c = particles[i].color;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw and update particles
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha})`;
      ctx.fill();

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;
    }

    requestAnimationFrame(draw);
  }

  draw();
})();

// ================================
// Scroll animation
// ================================
const fadeEls = document.querySelectorAll(
  'section, .timeline-item, .skill-group, .project-card, .pub-card, .stat-card, .gh-stat-card'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));

// ================================
// GitHub Stats
// ================================
async function fetchGitHubStats() {
  try {
    const res = await fetch('https://api.github.com/users/knowmili');
    if (!res.ok) throw new Error('GitHub API error');
    const data = await res.json();
    document.getElementById('gh-repos').textContent = data.public_repos ?? '—';
    document.getElementById('gh-followers').textContent = data.followers ?? '—';
    document.getElementById('gh-following').textContent = data.following ?? '—';

    // Fetch total stars
    const reposRes = await fetch(`https://api.github.com/users/knowmili/repos?per_page=100`);
    if (reposRes.ok) {
      const repos = await reposRes.json();
      const stars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
      document.getElementById('gh-stars').textContent = stars;
    }
  } catch (e) {
    console.log('Could not fetch GitHub stats:', e.message);
  }
}
fetchGitHubStats();

// ================================
// Back to top
// ================================
document.getElementById('back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ================================
// Contact form — Formspree integration
// ================================
document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const form = this;
  const btn = document.getElementById('submit-btn');
  const btnText = btn.querySelector('.btn-text');
  const btnLoading = btn.querySelector('.btn-loading');
  const statusEl = document.getElementById('form-status');

  // Disable button, show loading
  btn.disabled = true;
  btnText.style.display = 'none';
  btnLoading.style.display = 'inline';
  statusEl.textContent = '';
  statusEl.className = 'form-status';

  try {
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' },
    });

    if (response.ok) {
      statusEl.textContent = '✓ Message sent successfully! I\'ll get back to you within 24 hours.';
      statusEl.className = 'form-status success';
      form.reset();
    } else {
      const data = await response.json();
      if (data.errors) {
        statusEl.textContent = '✗ ' + data.errors.map(e => e.message).join(', ');
      } else {
        statusEl.textContent = '✗ Something went wrong. Please try again or email me directly.';
      }
      statusEl.className = 'form-status error';
    }
  } catch (err) {
    statusEl.textContent = '✗ Network error. Please check your connection and try again.';
    statusEl.className = 'form-status error';
  } finally {
    btn.disabled = false;
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';

    // Clear status after 8 seconds
    setTimeout(() => {
      statusEl.textContent = '';
      statusEl.className = 'form-status';
    }, 8000);
  }
});

// ================================
// Active nav link highlight
// ================================
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.getAttribute('id');
    }
  });
  navLinksAll.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
});
