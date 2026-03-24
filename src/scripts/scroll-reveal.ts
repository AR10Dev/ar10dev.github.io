/**
 * Scroll reveal effect - shows/hides sections with opacity based on scroll position
 */

interface ScrollState {
  lastScrollY: number;
  direction: 'up' | 'down';
  isScrolling: boolean;
  scrollTimeout: ReturnType<typeof setTimeout> | null;
}

const scrollState: ScrollState = {
  lastScrollY: 0,
  direction: 'down',
  isScrolling: false,
  scrollTimeout: null,
};

/**
 * Add subtle animations to sections based on scroll
 */
function initScrollReveal(): void {
  const sections = document.querySelectorAll('section');
  
  sections.forEach((section) => {
    // Set initial state
    const htmlSection = section as HTMLElement;
    htmlSection.style.transition = 'opacity 0.3s ease-in-out';
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            // Fade in when entering viewport
            target.style.opacity = '1';
            target.style.pointerEvents = 'auto';
          } else {
            // Subtle fade based on scroll direction
            const rect = entry.boundingClientRect;
            if (rect.top < 0) {
              // Section is above viewport - scrolling down
              target.style.opacity = '0.95';
            } else {
              // Section is below viewport - scrolling up
              target.style.opacity = '0.95';
            }
            target.style.pointerEvents = 'auto';
          }
        });
      },
      {
        threshold: [0, 0.1, 0.5, 0.9],
      }
    );
    
    observer.observe(section);
  });

  // Track scroll direction and apply scroll-based effects
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const sections = document.querySelectorAll('section');
    
    if (currentScrollY > scrollState.lastScrollY) {
      scrollState.direction = 'down';
      // When scrolling down, slightly fade non-active sections
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const target = section as HTMLElement;
        
        if (rect.top > window.innerHeight) {
          // Below viewport
          target.style.opacity = '0.7';
        } else if (rect.bottom < 0) {
          // Above viewport
          target.style.opacity = '0.8';
        }
      });
    } else if (currentScrollY < scrollState.lastScrollY) {
      scrollState.direction = 'up';
      // When scrolling up, different fade effect
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const target = section as HTMLElement;
        
        if (rect.top > window.innerHeight) {
          // Below viewport
          target.style.opacity = '0.8';
        } else if (rect.bottom < 0) {
          // Above viewport
          target.style.opacity = '0.7';
        }
      });
    }
    
    scrollState.lastScrollY = currentScrollY;
    scrollState.isScrolling = true;
    
    // Clear existing timeout
    if (scrollState.scrollTimeout) {
      clearTimeout(scrollState.scrollTimeout);
    }
    
    // Mark as not scrolling after 150ms of inactivity
    scrollState.scrollTimeout = setTimeout(() => {
      scrollState.isScrolling = false;
    }, 150);
  });
}

// Initialize on DOM ready
function initializeScrollReveal(): void {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal);
  } else {
    initScrollReveal();
  }
}

// Start immediately
initializeScrollReveal();

export { scrollState, initScrollReveal };
