// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 120
  });
  
  // Dark Mode Toggle
  const themeToggle = document.createElement('div');
  themeToggle.innerHTML = `
    <button id="theme-toggle" class="theme-btn">
      <i class="fas fa-moon"></i>
    </button>
  `;
  document.body.appendChild(themeToggle);
  
  document.getElementById('theme-toggle').addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-theme');
  });
  
  // Dynamic Card Hover Effect
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });