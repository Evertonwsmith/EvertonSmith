document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const balls = document.querySelectorAll('.ball');
    const pageRow = document.getElementById('pageRow');

    // Set initial active state
    balls[0].classList.add('active');
    pages[0].scrollIntoView();

    // Intersection Observer to fade in pages
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when at least 50% of the element is in view
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            } else {
                entry.target.style.opacity = '0';
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    pages.forEach(page => {
        observer.observe(page);
    });

    // Scroll event listener for navigation balls
    pageRow.addEventListener('scroll', () => {
        pages.forEach((page, index) => {
            const rect = page.getBoundingClientRect();
            if (rect.left >= 0 && rect.left < window.innerWidth) {
                balls.forEach(ball => ball.classList.remove('active'));
                balls[index].classList.add('active');
            }
        });
    });

    balls.forEach((ball, index) => {
        ball.addEventListener('click', () => {
            pages[index].scrollIntoView({ behavior: 'smooth' });
        });
    });
});
