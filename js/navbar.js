function initNavbar() {
    console.log('navbarjs loaded')
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const searchBar = document.querySelector('.search-bar');
    const userActions = document.querySelector('.user-actions');
    
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        searchBar.classList.toggle('active');
        userActions.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    
    const langSelector = document.querySelector('.language-selector');
    if (langSelector) {
        langSelector.addEventListener('click', function() {
           
            this.classList.toggle('open');
        });
    }
    
   
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            searchBar.classList.remove('active');
            userActions.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
    
   
    function handleResponsive() {
        if (window.innerWidth < 960) {
            document.body.classList.add('mobile-view');
        } else {
            document.body.classList.remove('mobile-view');
            navMenu.classList.remove('active');
            searchBar.classList.remove('active');
            userActions.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    }
    
    handleResponsive();
    window.addEventListener('resize', handleResponsive);
}