/* 
  page-shell.js — injected by every content page.
  Builds the full sidebar shell around the page content.
*/
(function(){
  const pages = [
    { group: "Getting Started", items: [
      { id: "introduction", label: "Introduction", icon: "🚀", href: "introduction.html" },
      { id: "setup",        label: "Setup & Install", icon: "⚙️", href: "setup.html" },
    ]},
    { group: "Languages", items: [
      { id: "java",       label: "Java",       dot: "var(--java)",   badge: "JDK 21", href: "java.html" },
      { id: "python",     label: "Python",     dot: "var(--python)", badge: "3.12",   href: "python.html" },
      { id: "javascript", label: "JavaScript", dot: "var(--js)",     badge: "ES2024", href: "javascript.html" },
    ]},
    { group: "Frameworks", items: [
      { id: "react",      label: "React",      dot: "var(--react)",  badge: "v19",  href: "react.html" },
      { id: "nodejs",     label: "Node.js",    dot: "var(--node)",   badge: "v22",  href: "nodejs.html" },
      { id: "springboot", label: "Spring Boot",dot: "var(--spring)", badge: "3.x",  href: "springboot.html" },
    ]},
    { group: "Tools", items: [
      { id: "git",    label: "Git & GitHub", dot: "var(--git)",    href: "git.html" },
      { id: "docker", label: "Docker",       dot: "var(--docker)", href: "docker.html" },
    ]},
  ];

  const current = window.location.pathname.split('/').pop();

  function navItem(item) {
    const active = item.href === current ? ' active' : '';
    const icon = item.dot
      ? `<span class="nav-icon nav-dot" style="background:${item.dot}"></span>`
      : `<span class="nav-icon">${item.icon}</span>`;
    const badge = item.badge
      ? `<span class="nav-badge">${item.badge}</span>` : '';
    return `<a href="${item.href}" class="nav-item${active}" data-page="${item.id}">${icon}<span class="nav-label">${item.label}</span>${badge}</a>`;
  }

  function navGroups() {
    return pages.map(g => `
      <div class="nav-group">
        <span class="nav-group-label">${g.group}</span>
        ${g.items.map(navItem).join('')}
      </div>`).join('');
  }

  const shell = `
<header class="topbar">
  <button class="hamburger" id="hamburger"><span></span><span></span><span></span></button>
  <div class="topbar-logo"><span class="logo-icon">⌨</span><span class="logo-text">DevDocs</span></div>
  <div class="topbar-spacer"></div>
</header>
<div class="overlay" id="overlay"></div>
<div class="app-shell">
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-header">
      <a href="../index.html" class="sidebar-logo">
        <span class="logo-icon">⌨</span>
        <span class="logo-text">DevDocs</span>
      </a>
      <button class="collapse-btn" id="collapseBtn" title="Collapse sidebar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
    </div>
    <div class="sidebar-search">
      <input type="text" placeholder="Search docs…" id="searchInput" />
      <span class="search-icon">⌕</span>
    </div>
    <nav class="sidebar-nav">${navGroups()}</nav>
    <div class="sidebar-footer"><span>Built with ❤ — DevDocs</span></div>
  </aside>
  <main class="main-content" id="mainContent">
    <div class="content-inner" id="pageContent"></div>
  </main>
</div>`;

  document.body.innerHTML = shell + document.body.innerHTML;

  // Move the original page content into #pageContent
  const tpl = document.getElementById('__content__');
  const dest = document.getElementById('pageContent');
  if (tpl && dest) dest.innerHTML = tpl.innerHTML;
})();
