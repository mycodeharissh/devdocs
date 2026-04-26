/* =========================================
   DevDocs — Main JS
   ========================================= */

const sidebar     = document.getElementById('sidebar');
const collapseBtn = document.getElementById('collapseBtn');
const mainContent = document.getElementById('mainContent');
const hamburger   = document.getElementById('hamburger');
const overlay     = document.getElementById('overlay');
const searchInput = document.getElementById('searchInput');

/* ---- Desktop: collapse/expand ---- */
if (collapseBtn) {
  collapseBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
    localStorage.setItem('sidebar-collapsed', sidebar.classList.contains('collapsed'));
  });
}

// Restore collapse state
if (localStorage.getItem('sidebar-collapsed') === 'true') {
  sidebar.classList.add('collapsed');
  mainContent && mainContent.classList.add('expanded');
}

/* ---- Mobile: hamburger ---- */
if (hamburger) {
  hamburger.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('mobile-open');
    overlay.classList.toggle('active', isOpen);
    hamburger.classList.toggle('open', isOpen);
  });
}
if (overlay) {
  overlay.addEventListener('click', closeMobileMenu);
}
function closeMobileMenu() {
  sidebar.classList.remove('mobile-open');
  overlay.classList.remove('active');
  hamburger && hamburger.classList.remove('open');
}

/* ---- Active nav item ---- */
function setActiveNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(item => {
    const href = item.getAttribute('href') || '';
    const page = href.split('/').pop();
    item.classList.toggle('active', page === current);
  });
}
setActiveNav();

// Close mobile menu on nav click
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    if (window.innerWidth <= 768) closeMobileMenu();
  });
});

/* ---- Sidebar search filter ---- */
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase().trim();
    document.querySelectorAll('.nav-item').forEach(item => {
      const label = item.querySelector('.nav-label');
      if (!label) return;
      const match = !q || label.textContent.toLowerCase().includes(q);
      item.style.display = match ? '' : 'none';
    });
    // Show/hide group labels
    document.querySelectorAll('.nav-group').forEach(group => {
      const visible = [...group.querySelectorAll('.nav-item')].some(i => i.style.display !== 'none');
      group.style.display = visible ? '' : 'none';
    });
  });
}
