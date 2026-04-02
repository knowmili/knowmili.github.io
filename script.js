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
// Contact form
// ================================
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('.submit-btn');
  btn.textContent = '✓ Sent!';
  btn.style.background = '#00d4aa';
  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
    this.reset();
  }, 3000);
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
