// Simple Router
export function initRouter() {
  const links = document.querySelectorAll('.nav-item');
  const pages = document.querySelectorAll('.page');
  
  // Handle click events
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      navigateTo(page);
    });
  });
  
  // Navigate to page
  function navigateTo(pageName) {
    // Update nav links
    links.forEach(link => {
      link.classList.toggle('active', link.dataset.page === pageName);
    });
    
    // Update pages
    pages.forEach(page => {
      page.classList.toggle('active', page.id === `page-${pageName}`);
    });
    
    // Save to state
    saveNavigationState(pageName);
  }
  
  // Save navigation state
  function saveNavigationState(page) {
    try {
      localStorage.setItem('lastPage', page);
    } catch (e) {}
  }
  
  // Load saved page
  function loadSavedPage() {
    try {
      const saved = localStorage.getItem('lastPage');
      if (saved) navigateTo(saved);
    } catch (e) {}
  }
  
  // Initial load
  loadSavedPage();
  
  // Expose globally
  window.navigateTo = navigateTo;
}

// Export
window.initRouter = initRouter;