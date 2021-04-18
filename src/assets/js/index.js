function hasPortfolio() {
    return JSON.parse(localStorage.getItem("portfolioSeen"));
}

function checkPortfolio() {
    const isViewingPortfolio = document.location.pathname.match(/^\/portfolio\/?/) !== null;
    if (isViewingPortfolio) {
        localStorage.setItem('portfolioSeen', 'true');
    }
}

function createPortfolioLink(){
    const navEl = document.getElementById('nav');
    const linkItem = document.createElement('li');
    linkItem.innerHTML = '<a href="/portfolio" class="" id="portfolio-link">Work</a>';
    navEl.insertBefore(linkItem, navEl.firstChild);
}

function showNav() {
    const el = document.getElementById('main-nav');
    el.classList.remove('hidden');
}

// helper function to wait for DOM load
var ready = (callback) =>{
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}

ready(() =>{ 
    checkPortfolio();
    if(hasPortfolio()){
        createPortfolioLink();
        showNav();
    }
});