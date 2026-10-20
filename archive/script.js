const toggle = document.querySelector('.theme-toggle');
toggle?.addEventListener('click', () => { document.body.classList.toggle('warm'); toggle.querySelector('b').textContent = document.body.classList.contains('warm') ? 'warm' : 'day'; });
const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }); }, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
