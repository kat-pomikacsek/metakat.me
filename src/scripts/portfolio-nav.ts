function hasPortfolio() {
  const raw = localStorage.getItem('portfolioSeen');
  if (raw == null) return false;
  return JSON.parse(raw);
}

function checkPortfolio() {
  const isViewingPortfolio = document.location.pathname.match(/^\/portfolio\/?/) !== null;
  if (isViewingPortfolio) {
    localStorage.setItem('portfolioSeen', 'true');
  }
}

function createPortfolioLink() {
  const navEl = document.getElementById('nav');
  if (!navEl) return;
  const linkItem = document.createElement('li');
  linkItem.innerHTML = '<a href="/portfolio" class="" id="portfolio-link">Work</a>';
  navEl.insertBefore(linkItem, navEl.firstChild);
}

function showNav() {
  const el = document.getElementById('main-nav');
  if (!el) return;
  el.classList.remove('hidden');
}

function ready(callback: () => void) {
  if (document.readyState !== 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback);
}

ready(() => {
  checkPortfolio();
  if (hasPortfolio()) {
    createPortfolioLink();
    showNav();
  }
});
