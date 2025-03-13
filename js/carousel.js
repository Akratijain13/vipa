
function initCarousels() {
    console.log('carousels loaded')
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(carousel => {
        setupCarousel(carousel);
    });
}

function setupCarousel(carousel) {
    const track = carousel.querySelector('.carousel-track');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const indicators = carousel.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    let itemWidth = 0;
    let itemsPerView = 1;
    
   
    if (carousel.id === 'main-carousel') {
        itemsPerView = 1;
    } else {
       
        itemsPerView = getItemsPerView();
    }
    
   
    function getItemsPerView() {
        if (window.innerWidth < 576) {
            return 1;
        } else if (window.innerWidth < 768) {
            return 2;
        } else if (window.innerWidth < 992) {
            return 3;
        } else {
            return 4;
        }
    }
    
   
    function setInitialState() {
        itemWidth = items[0].offsetWidth;        
        updateTrackPosition();
        updateIndicators();
    }
    
    
    function updateTrackPosition() {
        const offset = -currentIndex * itemWidth;
        track.style.transform = `translateX(${offset}px)`;
    }
    
   
    function updateIndicators() {
        if (indicators.length) {
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === currentIndex);
            });
        }
    }
    

    function updateActiveItem() {
        items.forEach((item, i) => {
            item.classList.toggle('active', i === currentIndex);
        });
    }
    
    
    function nextSlide() {
        if (currentIndex < items.length - itemsPerView) {
            currentIndex++;
        } else {
            currentIndex = 0; 
        }
        updateTrackPosition();
        updateIndicators();
        updateActiveItem();
    }
    
    
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = items.length - itemsPerView; 
        }
        updateTrackPosition();
        updateIndicators();
        updateActiveItem();
    }
    
  
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
 
    if (indicators.length) {
        indicators.forEach((indicator, i) => {
            indicator.addEventListener('click', () => {
                currentIndex = i;
                updateTrackPosition();
                updateIndicators();
                updateActiveItem();
            });
        });
    }
    

    function handleResize() {
        const newItemsPerView = getItemsPerView();
        if (newItemsPerView !== itemsPerView) {
            itemsPerView = newItemsPerView;
            currentIndex = 0;
        }
        
       
        itemWidth = items[0].offsetWidth;
        updateTrackPosition();
    }
    
   
    setInitialState();
    
    
    if (carousel.id === 'main-carousel') {
        setInterval(nextSlide, 5000);
    }
    
   
    window.addEventListener('resize', handleResize);
}